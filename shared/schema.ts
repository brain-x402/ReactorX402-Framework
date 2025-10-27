import { z } from "zod";

export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number(),
});

export const transactionSchema = z.object({
  signature: z.string(),
  amount: z.number(),
  recipient: z.string(),
  timestamp: z.number(),
  status: z.enum(["pending", "success", "failed"]),
  error: z.string().optional(),
  explorerUrl: z.string().optional(),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  walletAddress: z.string().min(32, "Invalid Solana wallet address"),
  conversationHistory: z.array(messageSchema).optional(),
});

export const chatResponseSchema = z.object({
  message: messageSchema,
  transaction: transactionSchema.optional(),
});

export const validateWalletSchema = z.object({
  address: z.string().min(32, "Invalid wallet address format"),
});

export type Message = z.infer<typeof messageSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export type ValidateWallet = z.infer<typeof validateWalletSchema>;

# Auto commit simulation 16 - 11/09/2025 22:41:29

# Auto commit simulation 24 - 11/09/2025 22:41:31

# Auto commit simulation 28 - 11/09/2025 22:41:32
