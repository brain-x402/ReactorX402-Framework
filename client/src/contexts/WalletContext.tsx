import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PhantomProvider {
  isPhantom: boolean;
  publicKey: { toString: () => string } | null;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on: (event: string, callback: (args: any) => void) => void;
  off: (event: string, callback: (args: any) => void) => void;
}

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const getProvider = (): PhantomProvider | null => {
    if (typeof window !== "undefined" && "solana" in window) {
      const provider = (window as any).solana;
      if (provider?.isPhantom) {
        return provider;
      }
    }
    return null;
  };

  useEffect(() => {
    const provider = getProvider();
    if (!provider) return;

    if (provider.publicKey) {
      setPublicKey(provider.publicKey.toString());
      setConnected(true);
    }

    const handleAccountChanged = (publicKey: any) => {
      if (publicKey) {
        setPublicKey(publicKey.toString());
        setConnected(true);
      } else {
        setPublicKey(null);
        setConnected(false);
      }
    };

    provider.on("accountChanged", handleAccountChanged);
    provider.on("disconnect", () => {
      setPublicKey(null);
      setConnected(false);
    });

    return () => {
      provider.off("accountChanged", handleAccountChanged);
    };
  }, []);

  const connect = async () => {
    const provider = getProvider();
    
    if (!provider) {
      window.open("https://phantom.app/", "_blank");
      throw new Error("Phantom wallet not found. Please install it from phantom.app");
    }

    try {
      setConnecting(true);
      const response = await provider.connect();
      const address = response.publicKey.toString();
      setPublicKey(address);
      setConnected(true);
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      throw error;
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    const provider = getProvider();
    if (provider) {
      await provider.disconnect();
    }
    setPublicKey(null);
    setConnected(false);
  };

  return (
    <WalletContext.Provider value={{ connected, publicKey, connecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
