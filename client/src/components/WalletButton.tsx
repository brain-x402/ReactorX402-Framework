import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WalletButton() {
  const { connected, publicKey, connecting, connect, disconnect } = useWallet();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await connect();
      toast({
        title: "Wallet Connected",
        description: "You can now start chatting and earning USDC!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please try again.",
      });
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connected && publicKey) {
    return (
      <Button
        variant="outline"
        onClick={handleDisconnect}
        data-testid="button-disconnect-wallet"
        className="gap-2"
      >
        <Wallet className="h-4 w-4" />
        <span className="font-mono text-sm">{formatAddress(publicKey)}</span>
        <LogOut className="h-3 w-3 ml-1" />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={connecting}
      data-testid="button-connect-wallet"
      className="gap-2"
    >
      <Wallet className="h-4 w-4" />
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
