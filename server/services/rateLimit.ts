import { getNetworkConfig } from "@shared/network";

interface RateLimitEntry {
  count: number;
  firstRequestTime: number;
  lastRequestTime: number;
}

const walletLimits = new Map<string, RateLimitEntry>();
const ipLimits = new Map<string, RateLimitEntry>();

let dailyTransferCount = 0;
let dailyTransferResetTime = Date.now() + 24 * 60 * 60 * 1000;

const WALLET_COOLDOWN_MS = 5 * 60 * 1000;
const IP_COOLDOWN_MS = 2 * 60 * 1000;
const MAX_REQUESTS_PER_IP_PER_HOUR = 20;
const MAX_REQUESTS_PER_WALLET_PER_HOUR = 10;

export function checkDailyLimit(): { allowed: boolean; remaining: number; error?: string } {
  const config = getNetworkConfig();
  
  if (Date.now() > dailyTransferResetTime) {
    dailyTransferCount = 0;
    dailyTransferResetTime = Date.now() + 24 * 60 * 60 * 1000;
  }
  
  const remaining = config.dailyTransferLimit - dailyTransferCount;
  
  if (dailyTransferCount >= config.dailyTransferLimit) {
    return {
      allowed: false,
      remaining: 0,
      error: `Daily transfer limit of ${config.dailyTransferLimit} reached. Resets in ${getTimeUntilReset()}.`,
    };
  }
  
  return { allowed: true, remaining };
}

export function incrementDailyCount(): void {
  dailyTransferCount++;
}

export function checkWalletRateLimit(walletAddress: string): { allowed: boolean; waitTime?: number; error?: string } {
  const now = Date.now();
  const entry = walletLimits.get(walletAddress);
  
  if (!entry) {
    walletLimits.set(walletAddress, {
      count: 1,
      firstRequestTime: now,
      lastRequestTime: now,
    });
    return { allowed: true };
  }
  
  const timeSinceLastRequest = now - entry.lastRequestTime;
  
  if (timeSinceLastRequest < WALLET_COOLDOWN_MS) {
    const waitTime = Math.ceil((WALLET_COOLDOWN_MS - timeSinceLastRequest) / 1000);
    return {
      allowed: false,
      waitTime,
      error: `Please wait ${waitTime} seconds before requesting another reward.`,
    };
  }
  
  const hourAgo = now - 60 * 60 * 1000;
  if (entry.firstRequestTime < hourAgo) {
    walletLimits.set(walletAddress, {
      count: 1,
      firstRequestTime: now,
      lastRequestTime: now,
    });
    return { allowed: true };
  }
  
  if (entry.count >= MAX_REQUESTS_PER_WALLET_PER_HOUR) {
    return {
      allowed: false,
      error: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_WALLET_PER_HOUR} requests per hour per wallet.`,
    };
  }
  
  entry.count++;
  entry.lastRequestTime = now;
  walletLimits.set(walletAddress, entry);
  
  return { allowed: true };
}

export function checkIpRateLimit(ip: string): { allowed: boolean; error?: string } {
  const now = Date.now();
  const entry = ipLimits.get(ip);
  
  if (!entry) {
    ipLimits.set(ip, {
      count: 1,
      firstRequestTime: now,
      lastRequestTime: now,
    });
    return { allowed: true };
  }
  
  const hourAgo = now - 60 * 60 * 1000;
  if (entry.firstRequestTime < hourAgo) {
    ipLimits.set(ip, {
      count: 1,
      firstRequestTime: now,
      lastRequestTime: now,
    });
    return { allowed: true };
  }
  
  if (entry.count >= MAX_REQUESTS_PER_IP_PER_HOUR) {
    return {
      allowed: false,
      error: `Too many requests from this IP. Maximum ${MAX_REQUESTS_PER_IP_PER_HOUR} requests per hour.`,
    };
  }
  
  entry.count++;
  entry.lastRequestTime = now;
  ipLimits.set(ip, entry);
  
  return { allowed: true };
}

function getTimeUntilReset(): string {
  const msUntilReset = dailyTransferResetTime - Date.now();
  const hours = Math.floor(msUntilReset / (60 * 60 * 1000));
  const minutes = Math.floor((msUntilReset % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes}m`;
}

setInterval(() => {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  
  for (const [wallet, entry] of Array.from(walletLimits.entries())) {
    if (entry.lastRequestTime < hourAgo) {
      walletLimits.delete(wallet);
    }
  }
  
  for (const [ip, entry] of Array.from(ipLimits.entries())) {
    if (entry.lastRequestTime < hourAgo) {
      ipLimits.delete(ip);
    }
  }
}, 60 * 60 * 1000);
