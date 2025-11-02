import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { WalletButton } from "@/components/WalletButton";
import { Send, MessageSquare, CheckCircle2, XCircle, ExternalLink, Loader2, AlertTriangle, Trash2, BarChart3, Coins, Clock, Menu, X, TrendingUp, Wallet, Network } from "lucide-react";
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
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
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
    document.title = "AI Chat - x402Pay";
  }, []);

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
      
      const conversationHistory = [
        ...messages.map(({ transaction, ...msg }) => msg),
        { id: userMessage.id, role: userMessage.role, content: userMessage.content, timestamp: userMessage.timestamp }
      ];
      
      const res = await apiRequest("POST", "/api/chat", {
        message,
        walletAddress: publicKey!,
        conversationHistory,
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
          title: "USDC Sent!",
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

  const handleClearChat = () => {
    setMessages([]);
    setShowClearDialog(false);
    toast({
      title: "Chat cleared",
      description: "Conversation history has been cleared",
    });
  };

  const stats = {
    totalMessages: messages.length,
    totalEarned: messages.filter(m => m.transaction?.status === "success").length * (networkInfo?.transferAmount || 0),
    successfulTransactions: messages.filter(m => m.transaction?.status === "success").length,
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col w-80 border-r border-border/40 bg-background/60 backdrop-blur-xl`}>
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                AI Chat
              </h2>
              <p className="text-xs text-muted-foreground">Earn USDC per message</p>
            </div>
          </div>
        </div>

        {/* Network Status */}
        {networkInfo && (
          <div className="p-6 space-y-4 border-b border-border/40">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <Network className="w-4 h-4" />
                Network
              </span>
              <Badge 
                variant={networkInfo.network === "mainnet" ? "destructive" : "outline"} 
                className="gap-1.5"
                data-testid="badge-network-sidebar"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${networkInfo.network === "mainnet" ? "bg-gray-500" : "bg-gray-400"}`} />
                {networkInfo.network === "mainnet" ? "Mainnet" : "Devnet"}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Wallet className="w-3.5 h-3.5" />
                  SOL Balance
                </span>
                <span className="font-mono font-medium" data-testid="text-sol-balance">{networkInfo.senderBalance.sol.toFixed(4)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Coins className="w-3.5 h-3.5" />
                  USDC Balance
                </span>
                <span className="font-mono font-medium" data-testid="text-usdc-balance">{networkInfo.senderBalance.usdc.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Daily Limit</span>
                <span className="font-mono font-medium" data-testid="text-daily-limit">{networkInfo.dailyLimit.remaining} left</span>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Session Statistics</h3>
          </div>

          <div className="space-y-3">
            <Card className="bg-card/50 border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Messages</span>
                  </div>
                  <span className="text-2xl font-bold" data-testid="text-total-messages">{stats.totalMessages}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-muted-foreground">Total Earned</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent" data-testid="text-total-earned">
                    {stats.totalEarned}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">USDC</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-muted-foreground">Successful</span>
                  </div>
                  <span className="text-2xl font-bold" data-testid="text-successful-transactions">{stats.successfulTransactions}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Transactions</p>
              </CardContent>
            </Card>
          </div>

          {messages.length > 0 && (
            <Button
              variant="outline"
              className="w-full mt-6 gap-2 hover-elevate"
              onClick={() => setShowClearDialog(true)}
              data-testid="button-clear-chat-sidebar"
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat
            </Button>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setShowSidebar(false)}>
          <aside className="w-80 h-full bg-background border-r border-border/40" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                    AI Chat
                  </h2>
                  <p className="text-xs text-muted-foreground">Earn USDC per message</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)} data-testid="button-close-sidebar">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Network Status Mobile */}
            {networkInfo && (
              <div className="p-6 space-y-4 border-b border-border/40">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    Network
                  </span>
                  <Badge 
                    variant={networkInfo.network === "mainnet" ? "destructive" : "outline"} 
                    className="gap-1.5"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${networkInfo.network === "mainnet" ? "bg-gray-500" : "bg-gray-400"}`} />
                    {networkInfo.network === "mainnet" ? "Mainnet" : "Devnet"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5" />
                      SOL Balance
                    </span>
                    <span className="font-mono font-medium" data-testid="text-sol-balance-mobile">{networkInfo.senderBalance.sol.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Coins className="w-3.5 h-3.5" />
                      USDC Balance
                    </span>
                    <span className="font-mono font-medium" data-testid="text-usdc-balance-mobile">{networkInfo.senderBalance.usdc.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Daily Limit</span>
                    <span className="font-mono font-medium" data-testid="text-daily-limit-mobile">{networkInfo.dailyLimit.remaining} left</span>
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Mobile */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">Session Statistics</h3>
              </div>

              <div className="space-y-3">
                <Card className="bg-card/50 border-border/40">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Messages</span>
                      </div>
                      <span className="text-2xl font-bold" data-testid="text-total-messages-mobile">{stats.totalMessages}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/40">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-muted-foreground">Total Earned</span>
                      </div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent" data-testid="text-total-earned-mobile">
                        {stats.totalEarned}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">USDC</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/40">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-muted-foreground">Successful</span>
                      </div>
                      <span className="text-2xl font-bold" data-testid="text-successful-transactions-mobile">{stats.successfulTransactions}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Transactions</p>
                  </CardContent>
                </Card>
              </div>

              {messages.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full mt-6 gap-2 hover-elevate"
                  onClick={() => {
                    setShowClearDialog(true);
                    setShowSidebar(false);
                  }}
                  data-testid="button-clear-chat-mobile"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Chat
                </Button>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between h-full px-4 md:px-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover-elevate"
                onClick={() => setShowSidebar(true)}
                data-testid="button-open-sidebar"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="lg:hidden flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h1 className="font-semibold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                  AI Chat
                </h1>
              </div>
              {networkInfo && (
                <Badge 
                  variant={networkInfo.network === "mainnet" ? "destructive" : "outline"} 
                  className="gap-1.5 hidden lg:flex"
                  data-testid="badge-network-header"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${networkInfo.network === "mainnet" ? "bg-gray-500" : "bg-gray-400"}`} />
                  {networkInfo.network === "mainnet" ? "Mainnet - Real USDC" : "Devnet"}
                </Badge>
              )}
            </div>
            
            <WalletButton />
          </div>
        </header>

        {/* Messages Area */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto pb-32" data-testid="chat-messages-container">
              <div className="mx-auto max-w-4xl px-4 md:px-6 py-6">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-6 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-400/20 to-gray-400/20 flex items-center justify-center border border-gray-600/20">
                      <MessageSquare className="w-10 h-10 text-gray-300" />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                        Start a Conversation
                      </h2>
                      <p className="text-muted-foreground max-w-md text-sm md:text-base">
                        Connect your wallet and send a message to begin. {networkInfo && `You'll receive ${networkInfo.transferAmount} USDC for each interaction on ${networkInfo.network}.`}
                      </p>
                      {connected && isWalletValidated && (
                        <div className="pt-4">
                          <Badge variant="outline" className="gap-2">
                            <CheckCircle2 className="w-3 h-3 text-gray-400" />
                            Wallet Connected
                          </Badge>
                        </div>
                      )}
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

            {/* Input Area */}
            <div className="fixed bottom-0 left-0 right-0 lg:left-80 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="mx-auto max-w-4xl p-4">
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
                    className="flex-1 min-h-[52px] max-h-[200px] px-6 py-4 text-base rounded-2xl border border-border/40 bg-background/50 backdrop-blur resize-none focus:outline-none focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600/50 disabled:opacity-50 transition-all"
                    disabled={!connected || !isWalletValidated || chatMutation.isPending}
                    rows={1}
                    data-testid="input-message"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!inputMessage.trim() || !connected || !isWalletValidated || chatMutation.isPending}
                    className="w-[52px] h-[52px] rounded-2xl flex-shrink-0 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg shadow-gray-700/25"
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
      </div>

      {/* Clear Chat Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent data-testid="dialog-clear-chat">
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Chat History?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete all messages and transaction history from this session. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-clear">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearChat} data-testid="button-confirm-clear">
              Clear Chat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Mainnet Warning Dialog */}
      <AlertDialog open={showMainnetWarning} onOpenChange={setShowMainnetWarning}>
        <AlertDialogContent data-testid="dialog-mainnet-warning">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-gray-400" />
              Mainnet Mode - Real Money
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 text-left">
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
              </div>
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
        <div className="flex items-center gap-2 mb-2 ml-1">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">AI Assistant</span>
        </div>
      )}
      
      <div className={`max-w-[85%] md:max-w-2xl`}>
        <div
          className={`px-5 py-3.5 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
              : 'bg-card/80 backdrop-blur border border-border/40'
          }`}
        >
          <p className="text-base leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        
        <div className="flex items-center gap-2 mt-1.5 px-1">
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
    <Card className="mt-3 bg-card/60 backdrop-blur border-border/40" data-testid="transaction-notification">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {transaction.status === "success" ? (
              <div className="w-8 h-8 rounded-lg bg-gray-400/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            ) : transaction.status === "failed" ? (
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {transaction.status === "success" && `${transaction.amount} USDC sent`}
                {transaction.status === "pending" && "Sending USDC..."}
                {transaction.status === "failed" && "Transfer failed"}
              </p>
              {transaction.error && (
                <p className="text-xs text-muted-foreground truncate mt-0.5">{transaction.error}</p>
              )}
            </div>
          </div>

          {transaction.status === "success" && transaction.explorerUrl && (
            <a
              href={transaction.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-300 hover:text-gray-200 flex items-center gap-1.5 flex-shrink-0 transition-colors"
              data-testid="link-transaction-explorer"
            >
              View
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start" data-testid="typing-indicator">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
          <MessageSquare className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-medium text-muted-foreground">AI Assistant</span>
      </div>
      <div className="ml-8 bg-card/80 backdrop-blur border border-border/40 rounded-2xl px-5 py-4">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
