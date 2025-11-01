export type SolanaNetwork = "mainnet" | "devnet";

export interface NetworkConfig {
  network: SolanaNetwork;
  rpcEndpoint: string;
  usdcMint: string;
  explorerUrl: string;
  transferAmount: number;
  confirmationLevel: "processed" | "confirmed" | "finalized";
  minSolBalance: number;
  minUsdcBuffer: number;
  dailyTransferLimit: number;
}

const MAINNET_CONFIG: NetworkConfig = {
  network: "mainnet",
  rpcEndpoint: "https://api.mainnet-beta.solana.com",
  usdcMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  explorerUrl: "https://solscan.io/tx",
  transferAmount: 1000,
  confirmationLevel: "confirmed",
  minSolBalance: 0.01,
  minUsdcBuffer: 1.0,
  dailyTransferLimit: 100,
};

const DEVNET_CONFIG: NetworkConfig = {
  network: "devnet",
  rpcEndpoint: "https://api.devnet.solana.com",
  usdcMint: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
  explorerUrl: "https://solscan.io/tx",
  transferAmount: 1000,
  confirmationLevel: "confirmed",
  minSolBalance: 0.01,
  minUsdcBuffer: 0.01,
  dailyTransferLimit: 1000,
};

export function getNetworkConfig(): NetworkConfig {
  const network = (process.env.SOLANA_NETWORK || "mainnet") as SolanaNetwork;
  
  const baseConfig = network === "mainnet" ? MAINNET_CONFIG : DEVNET_CONFIG;
  
  const customTransferAmount = process.env.TRANSFER_AMOUNT 
    ? parseInt(process.env.TRANSFER_AMOUNT, 10) 
    : baseConfig.transferAmount;
  
  const customDailyLimit = process.env.DAILY_TRANSFER_LIMIT
    ? parseInt(process.env.DAILY_TRANSFER_LIMIT, 10)
    : baseConfig.dailyTransferLimit;
  
  const customMinUsdcBuffer = process.env.MIN_USDC_BUFFER
    ? parseFloat(process.env.MIN_USDC_BUFFER)
    : baseConfig.minUsdcBuffer;
  
  const transfersEnabled = process.env.TRANSFERS_ENABLED !== "false";
  
  return {
    ...baseConfig,
    transferAmount: transfersEnabled ? customTransferAmount : 0,
    dailyTransferLimit: customDailyLimit,
    minUsdcBuffer: customMinUsdcBuffer,
  };
}

export function formatUsdcAmount(lamports: number): number {
  return lamports / 1_000_000;
}

export function getExplorerUrl(signature: string, network: SolanaNetwork): string {
  const cluster = network === "mainnet" ? "" : "?cluster=devnet";
  return `https://solscan.io/tx/${signature}${cluster}`;
}
