import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import bs58 from "bs58";
import { getNetworkConfig, getExplorerUrl, formatUsdcAmount } from "@shared/network";

let connection: Connection | null = null;
let senderKeypair: Keypair | null = null;

function getConnection(): Connection {
  if (!connection) {
    const config = getNetworkConfig();
    connection = new Connection(config.rpcEndpoint, config.confirmationLevel);
  }
  return connection;
}

function getSenderKeypair(): Keypair {
  if (senderKeypair) return senderKeypair;

  const privateKey = process.env.SOLANA_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("SOLANA_PRIVATE_KEY_MISSING");
  }

  try {
    const decoded = bs58.decode(privateKey);
    senderKeypair = Keypair.fromSecretKey(decoded);
    return senderKeypair;
  } catch (error) {
    throw new Error("Invalid SOLANA_PRIVATE_KEY format. Must be base58 encoded.");
  }
}

export async function checkBalances(): Promise<{
  solBalance: number;
  usdcBalance: number;
  hasSufficientSol: boolean;
  hasSufficientUsdc: boolean;
  error?: string;
}> {
  try {
    const config = getNetworkConfig();
    const senderKeypair = getSenderKeypair();
    const conn = getConnection();
    
    const solBalance = await conn.getBalance(senderKeypair.publicKey);
    const solBalanceInSol = solBalance / LAMPORTS_PER_SOL;
    
    const usdcMint = new PublicKey(config.usdcMint);
    const senderTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      senderKeypair.publicKey
    );
    
    let usdcBalance = 0;
    try {
      const tokenBalance = await conn.getTokenAccountBalance(senderTokenAccount);
      usdcBalance = parseFloat(tokenBalance.value.uiAmount?.toString() || "0");
    } catch (error) {
      console.warn("USDC token account not found for sender");
    }
    
    const transferAmountUsdc = formatUsdcAmount(config.transferAmount);
    const requiredUsdc = transferAmountUsdc + config.minUsdcBuffer;
    
    return {
      solBalance: solBalanceInSol,
      usdcBalance,
      hasSufficientSol: solBalanceInSol >= config.minSolBalance,
      hasSufficientUsdc: usdcBalance >= requiredUsdc,
    };
  } catch (error: any) {
    return {
      solBalance: 0,
      usdcBalance: 0,
      hasSufficientSol: false,
      hasSufficientUsdc: false,
      error: error.message,
    };
  }
}

export async function validateWalletAddress(address: string): Promise<{ valid: boolean; error?: string }> {
  try {
    if (!address || address.length < 32 || address.length > 44) {
      return { valid: false, error: "Invalid wallet address length" };
    }

    const publicKey = new PublicKey(address);
    const conn = getConnection();
    
    const accountInfo = await conn.getAccountInfo(publicKey);
    
    return { valid: true };
  } catch (error: any) {
    return { valid: false, error: "Invalid Solana wallet address format" };
  }
}

export async function transferUSDC(recipientAddress: string): Promise<{
  signature: string;
  status: "success" | "failed";
  error?: string;
  explorerUrl?: string;
  errorType?: "insufficient_funds" | "disabled" | "recipient_account_missing" | "transaction_failed";
}> {
  const config = getNetworkConfig();
  const senderKeypair = getSenderKeypair();
  const conn = getConnection();
  
  if (config.transferAmount === 0) {
    return {
      signature: "",
      status: "failed",
      error: "Transfers are currently disabled. Set TRANSFERS_ENABLED=true to enable.",
      errorType: "disabled",
    };
  }
  
  const balances = await checkBalances();
  
  if (!balances.hasSufficientSol) {
    return {
      signature: "",
      status: "failed",
      error: `Insufficient SOL for transaction fees. Current: ${balances.solBalance.toFixed(4)} SOL, Required: ${config.minSolBalance} SOL`,
      errorType: "insufficient_funds",
    };
  }
  
  if (!balances.hasSufficientUsdc) {
    const transferAmountUsdc = formatUsdcAmount(config.transferAmount);
    const requiredUsdc = transferAmountUsdc + config.minUsdcBuffer;
    return {
      signature: "",
      status: "failed",
      error: `Insufficient USDC balance. Current: ${balances.usdcBalance.toFixed(3)} USDC, Required: ${requiredUsdc.toFixed(3)} USDC`,
      errorType: "insufficient_funds",
    };
  }
  
  try {
    const recipientPublicKey = new PublicKey(recipientAddress);
    const usdcMint = new PublicKey(config.usdcMint);

    const senderTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      senderKeypair.publicKey
    );

    const recipientTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      recipientPublicKey
    );

    const recipientAccountInfo = await conn.getAccountInfo(recipientTokenAccount);
    
    if (!recipientAccountInfo) {
      return {
        signature: "",
        status: "failed",
        error: "Recipient does not have a USDC token account. They need to create one first.",
        errorType: "recipient_account_missing",
      };
    }

    const transaction = new Transaction().add(
      createTransferInstruction(
        senderTokenAccount,
        recipientTokenAccount,
        senderKeypair.publicKey,
        config.transferAmount,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    const signature = await sendAndConfirmTransaction(
      conn,
      transaction,
      [senderKeypair],
      {
        commitment: config.confirmationLevel,
      }
    );
    
    const explorerUrl = getExplorerUrl(signature, config.network);

    console.log(`[TRANSFER SUCCESS] ${formatUsdcAmount(config.transferAmount)} USDC to ${recipientAddress} | Signature: ${signature}`);

    return {
      signature,
      status: "success",
      explorerUrl,
    };
  } catch (error: any) {
    console.error("Solana transfer error:", error);
    
    let errorMessage = "Failed to transfer USDC";
    if (error.message?.includes("insufficient")) {
      errorMessage = "Insufficient USDC balance in sender wallet";
    } else if (error.message?.includes("AccountNotFound")) {
      errorMessage = "Token account not found";
    }

    return {
      signature: "",
      status: "failed",
      error: errorMessage,
      errorType: "transaction_failed",
    };
  }
}

export async function getSenderBalance(): Promise<number> {
  try {
    const config = getNetworkConfig();
    const senderKeypair = getSenderKeypair();
    const conn = getConnection();
    const usdcMint = new PublicKey(config.usdcMint);
    
    const senderTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      senderKeypair.publicKey
    );

    const balance = await conn.getTokenAccountBalance(senderTokenAccount);
    return parseFloat(balance.value.uiAmount?.toString() || "0");
  } catch (error) {
    console.error("Failed to get sender balance:", error);
    return 0;
  }
}

export function getNetworkInfo() {
  const config = getNetworkConfig();
  return {
    network: config.network,
    transferAmount: formatUsdcAmount(config.transferAmount),
    explorerUrl: config.explorerUrl,
  };
}
