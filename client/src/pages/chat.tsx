import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { WalletButton } from "@/components/WalletButton";
import { Send, MessageSquare, CheckCircle2, XCircle, ExternalLink, Loader2, AlertCircle, AlertTriangle } from "lucide-react";
import type { Message, ChatResponse, Transaction } from "@shared/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type MessageWithTransaction = Message & { transaction?: Transaction };

interface NetworkInfo {
  network: "mainnet" | "devnet";
  transferAmount: number;
  explorerUrl: string;
  senderBalance: {
    sol: number;
    usdc: number;
  };
  dailyLimit: {
    remaining: number;
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<MessageWithTransaction[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isWalletValidated, setIsWalletValidated] = useState(false);
  const [showMainnetWarning, setShowMainnetWarning] = useState(false);
  const [hasShownMainnetWarning, setHasShownMainnetWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { connected, publicKey } = useWallet();

  const { data: networkInfo } = useQuery<NetworkInfo>({
    queryKey: ["/api/network-info"],
    refetchInterval: 30000,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (networkInfo?.network === "mainnet" && connected && isWalletValidated && !hasShownMainnetWarning && messages.length === 0) {
      setShowMainnetWarning(true);
      setHasShownMainnetWarning(true);
    }
  }, [networkInfo, connected, isWalletValidated, hasShownMainnetWarning, messages.length]);

  useEffect(() => {
    const validateConnectedWallet = async () => {
      if (connected && publicKey && !isWalletValidated) {
        try {
          const res = await apiRequest("POST", "/api/validate-wallet", { address: publicKey });
          const response = await res.json();
          
          if (response.valid) {
            setIsWalletValidated(true);
          } else {
            toast({
              variant: "destructive",
              title: "Wallet Validation Failed",
              description: response.error || "Unable to validate your wallet on Solana network",
            });
          }
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: error.message || "Failed to validate wallet",
          });
        }
      } else if (!connected) {
        setIsWalletValidated(false);
      }
    };

    validateConnectedWallet();
  }, [connected, publicKey, isWalletValidated, toast]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const userMessage: MessageWithTransaction = {
        id: Date.now().toString(),
        role: "user",
        content: message,
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      const res = await apiRequest("POST", "/api/chat", {
        message,
        walletAddress: publicKey!,
        conversationHistory: messages.map(({ transaction, ...msg }) => msg),
      });
      
      const response = await res.json() as ChatResponse;
      
      return response;
    },
    onSuccess: (data) => {
      const messageWithTransaction: MessageWithTransaction = {
        ...data.message,
        transaction: data.transaction,
      };
      
      setMessages(prev => [...prev, messageWithTransaction]);
      
      if (data.transaction && data.transaction.status === "success") {
        toast({
          title: "USDC Sent! 🎉",
          description: `${data.transaction.amount} USDC transferred to your wallet`,
        });
      }
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Failed to send message. Please try again.";
      
      let title = "Error";
      let description = errorMessage;
      
      if (errorMessage.includes("503")) {
        if (errorMessage.includes("AI service") || errorMessage.includes("MISTRAL_API_KEY")) {
          title = "AI Service Not Configured";
          description = "The Mistral AI service is not set up. Please add MISTRAL_API_KEY to your secrets.";
        } else if (errorMessage.includes("Payment service") || errorMessage.includes("SOLANA_PRIVATE_KEY")) {
          title = "Payment Service Not Configured";
          description = "The Solana payment service is not set up. Please add SOLANA_PRIVATE_KEY to your secrets.";
        }
      } else if (errorMessage.includes("429") || errorMessage.includes("Rate limit") || errorMessage.includes("wait")) {
        title = "Rate Limit Reached";
        description = errorMessage;
      } else if (errorMessage.includes("402") || errorMessage.includes("Insufficient")) {
        title = "Insufficient Funds";
        description = errorMessage;
      }
      
      toast({
        title,
        description,
        variant: "destructive",
      });
      
      setMessages(prev => prev.slice(0, -1));
    },
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (!connected || !publicKey || !isWalletValidated) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Solana wallet first",
        variant: "destructive",
      });
      return;
    }

    const message = inputMessage.trim();
    setInputMessage("");
    chatMutation.mutate(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">AI Chat</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <WalletButton />
            {networkInfo && (
              <Badge 
                variant={networkInfo.network === "mainnet" ? "destructive" : "outline"} 
                className="gap-1 text-xs"
                data-testid="badge-network"
              >
                <span className={`w-2 h-2 rounded-full ${networkInfo.network === "mainnet" ? "bg-orange-500" : "bg-green-500"}`} />
                {networkInfo.network === "mainnet" ? "Mainnet - Real USDC" : "Devnet"}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto pb-32" data-testid="chat-messages-container">
            <div className="mx-auto max-w-3xl px-4 md:px-6 py-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-4 text-center">
                  <MessageSquare className="w-16 h-16 text-muted-foreground/50" />
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Start a conversation</h2>
                    <p className="text-muted-foreground max-w-sm">
                      Messages will appear here. {networkInfo && `You'll receive ${networkInfo.transferAmount} USDC for each interaction.`}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      transaction={message.transaction}
                    />
                  ))}
                  
                  {chatMutation.isPending && <TypingIndicator />}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-3xl p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={connected && isWalletValidated ? "Type your message..." : "Connect wallet to start chatting"}
                  className="flex-1 min-h-[44px] max-h-[200px] px-6 py-3 text-base rounded-full border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                  disabled={!connected || !isWalletValidated || chatMutation.isPending}
                  rows={1}
                  data-testid="input-message"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputMessage.trim() || !connected || !isWalletValidated || chatMutation.isPending}
                  className="w-11 h-11 rounded-full flex-shrink-0"
                  data-testid="button-send-message"
                >
                  {chatMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <AlertDialog open={showMainnetWarning} onOpenChange={setShowMainnetWarning}>
        <AlertDialogContent data-testid="dialog-mainnet-warning">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Mainnet Mode - Real Money
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 text-left">
              <p>
                You are connected to <strong>Solana Mainnet</strong>. This means:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Real USDC will be transferred to your wallet</li>
                <li>Each chat interaction earns you {networkInfo?.transferAmount} USDC</li>
                <li>Transfers are subject to rate limits and daily caps</li>
                <li>Transactions are permanent and irreversible</li>
              </ul>
              <p className="text-sm font-medium">
                Make sure your wallet address is correct before proceeding.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowMainnetWarning(false)} data-testid="button-acknowledge-warning">
              I Understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function MessageBubble({ message, transaction }: { message: MessageWithTransaction; transaction?: Transaction }) {
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`} data-testid={`message-${message.role}`}>
      {!isUser && (
        <span className="text-xs text-muted-foreground mb-1 ml-1">AI Assistant</span>
      )}
      
      <div className={`max-w-[85%] md:max-w-2xl`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border'
          }`}
        >
          <p className="text-base whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        
        <div className="flex items-center gap-2 mt-1 px-1">
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>

        {transaction && !isUser && (
          <TransactionNotification transaction={transaction} />
        )}
      </div>
    </div>
  );
}

function TransactionNotification({ transaction }: { transaction: Transaction }) {
  return (
    <Card className="mt-2 p-3" data-testid="transaction-notification">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {transaction.status === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : transaction.status === "failed" ? (
            <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          ) : (
            <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          )}
          
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium">
              {transaction.status === "success" && `${transaction.amount} USDC sent`}
              {transaction.status === "pending" && "Sending USDC..."}
              {transaction.status === "failed" && "Transfer failed"}
            </p>
            {transaction.error && (
              <p className="text-xs text-muted-foreground truncate">{transaction.error}</p>
            )}
          </div>
        </div>

        {transaction.status === "success" && transaction.explorerUrl && (
          <a
            href={transaction.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1 flex-shrink-0"
            data-testid="link-transaction-explorer"
          >
            View
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </Card>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start" data-testid="typing-indicator">
      <div className="bg-card border rounded-2xl px-4 py-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
