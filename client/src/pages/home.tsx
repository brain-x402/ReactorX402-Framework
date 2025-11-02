import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "x402Pay - Decentralized Micropayments for IoT on Solana";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900/50 to-black">
      <section className="min-h-screen flex items-center justify-center px-8 py-32">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight" data-testid="text-hero-title">
            <span className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400 bg-clip-text text-transparent">
              x402Pay
            </span>
          </h1>
          
          <p className="text-3xl md:text-4xl font-semibold text-foreground max-w-4xl mx-auto">
            Decentralized Micropayments for IoT on Solana
          </p>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Empowering Machine-to-Machine Economy with Get-as-You-Go Payments
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl border border-gray-700/40 bg-gray-800/20 backdrop-blur-sm space-y-2" data-testid="card-feature-speed">
              <Zap className="w-8 h-8 text-gray-300 mx-auto" />
              <div className="text-3xl font-bold text-foreground">40,000 TPS</div>
              <div className="text-sm text-muted-foreground">Solana Speed</div>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-700/40 bg-gray-800/20 backdrop-blur-sm space-y-2" data-testid="card-feature-cost">
              <Shield className="w-8 h-8 text-gray-300 mx-auto" />
              <div className="text-3xl font-bold text-foreground">0.001 USDC</div>
              <div className="text-sm text-muted-foreground">Get Per Prompt</div>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-700/40 bg-gray-800/20 backdrop-blur-sm space-y-2" data-testid="card-feature-time">
              <Layers className="w-8 h-8 text-gray-300 mx-auto" />
              <div className="text-3xl font-bold text-foreground">&lt;1 sec</div>
              <div className="text-sm text-muted-foreground">Settlement Time</div>
            </div>
          </div>
          
          <div className="flex justify-center pt-8">
            <Link href="/executive-summary">
              <Button size="lg" className="bg-gradient-to-r from-gray-700 to-gray-800 hover-elevate active-elevate-2" data-testid="button-get-started">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-24 px-8 border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            The Future of IoT Payments
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Unlike traditional "pay-as-you-go" models requiring upfront payments or subscriptions, x402 Sol enables a "get-as-you-go" paradigm where users and machines instantly receive services upon request, with micropayments settled sub-second via Solana's high throughput. No pre-funding needed beyond wallet balance — reactive and frictionless.
          </p>
          <div className="pt-4">
            <Link href="/x402-sol">
              <Button variant="ghost" className="text-gray-300 hover-elevate" data-testid="link-learn-protocol">
                Learn about x402 Sol Protocol
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
