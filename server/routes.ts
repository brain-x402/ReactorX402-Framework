import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { chatRequestSchema, validateWalletSchema } from "@shared/schema";
import { generateChatResponse } from "./services/mistral";
import { validateWalletAddress, transferUSDC, getNetworkInfo, checkBalances } from "./services/solana";
import { checkDailyLimit, checkWalletRateLimit, checkIpRateLimit, incrementDailyCount } from "./services/rateLimit";
import type { ChatResponse, Message, Transaction } from "@shared/schema";
import { formatUsdcAmount } from "@shared/network";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/network-info", async (req, res) => {
    try {
      const networkInfo = getNetworkInfo();
      const balances = await checkBalances();
      const dailyLimit = checkDailyLimit();
      
      res.json({
        ...networkInfo,
        senderBalance: {
          sol: balances.solBalance,
          usdc: balances.usdcBalance,
        },
        dailyLimit: {
          remaining: dailyLimit.remaining,
        },
      });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch network info" });
    }
  });

  app.post("/api/validate-wallet", async (req, res) => {
    try {
      const { address } = validateWalletSchema.parse(req.body);
      const result = await validateWalletAddress(address);
      res.json(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ valid: false, error: error.errors[0].message });
      } else {
        res.status(500).json({ valid: false, error: "Failed to validate wallet" });
      }
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, walletAddress, conversationHistory } = chatRequestSchema.parse(req.body);

      // Rate limiting (configurable via RATE_LIMITING_ENABLED env var, defaults to true for safety)
      const rateLimitingEnabled = process.env.RATE_LIMITING_ENABLED !== "false";
      
      if (rateLimitingEnabled) {
        const clientIp = req.ip || req.socket.remoteAddress || "unknown";
        const ipCheck = checkIpRateLimit(clientIp);
        if (!ipCheck.allowed) {
          return res.status(429).json({ error: ipCheck.error });
        }

        const walletCheck = checkWalletRateLimit(walletAddress);
        if (!walletCheck.allowed) {
          return res.status(429).json({ error: walletCheck.error, waitTime: walletCheck.waitTime });
        }

        const dailyCheck = checkDailyLimit();
        if (!dailyCheck.allowed) {
          return res.status(429).json({ error: dailyCheck.error });
        }
      }

      const aiResponse = await generateChatResponse(message, conversationHistory || []);

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: Date.now(),
      };

      let transaction: Transaction | undefined;

      try {
        const transferResult = await transferUSDC(walletAddress);
        const networkInfo = getNetworkInfo();
        const transferAmountUsdc = networkInfo.transferAmount;
        
        if (transferResult.errorType === "insufficient_funds") {
          return res.status(402).json({ 
            error: transferResult.error 
          });
        }
        
        transaction = {
          signature: transferResult.signature,
          amount: transferAmountUsdc,
          recipient: walletAddress,
          timestamp: Date.now(),
          status: transferResult.status,
          error: transferResult.error,
          explorerUrl: transferResult.explorerUrl,
        };
        
        if (transferResult.status === "success" && rateLimitingEnabled) {
          incrementDailyCount();
        }
      } catch (error: any) {
        console.error("Transaction error:", error);
        
        if (error.message?.includes("SOLANA_PRIVATE_KEY_MISSING")) {
          return res.status(503).json({ 
            error: "Payment service is not configured. Please add SOLANA_PRIVATE_KEY to your secrets." 
          });
        }
        
        const networkInfo = getNetworkInfo();
        transaction = {
          signature: "",
          amount: networkInfo.transferAmount,
          recipient: walletAddress,
          timestamp: Date.now(),
          status: "failed",
          error: error.message || "Failed to process transaction",
        };
      }

      const response: ChatResponse = {
        message: assistantMessage,
        transaction,
      };

      res.json(response);
    } catch (error: any) {
      console.error("Chat error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else if (error.message?.includes("MISTRAL_API_KEY")) {
        res.status(503).json({ error: "AI service is not configured. Please add MISTRAL_API_KEY." });
      } else if (error.message?.includes("SOLANA_PRIVATE_KEY")) {
        res.status(503).json({ error: "Payment service is not configured. Please add SOLANA_PRIVATE_KEY." });
      } else {
        res.status(500).json({ error: error.message || "Failed to process request" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

# Auto commit simulation 12 - 11/09/2025 22:41:29

# Auto commit simulation 25 - 11/09/2025 22:41:31

# Auto commit simulation 26 - 11/09/2025 22:41:32
