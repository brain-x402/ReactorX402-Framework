import { Link } from "wouter";
import { CheckCircle2, Clock, Circle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function Roadmap() {
  useEffect(() => {
    document.title = "Roadmap - x402Pay";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-5xl mx-auto px-8 py-24 space-y-16">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-page-title">
            <span className="bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Our journey from devnet to global IoT micropayment infrastructure.
          </p>
        </div>

        <div className="relative space-y-12" data-testid="section-timeline">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-400 via-gray-400 to-gray-400"></div>

          <div className="relative pl-20">
            <div className="absolute left-5 top-4 w-6 h-6 rounded-full bg-gray-800 border-4 border-black flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-black" />
            </div>
            <Card className="border-gray-700/30 bg-gray-800/10">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">Q1 2026</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800/20 text-gray-300 border border-gray-700/30">
                    Completed
                  </span>
                </div>
                <CardTitle className="text-2xl text-foreground">Mainnet Launch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Foundation deployment and initial pilot program.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Devnet deployment and testing</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Security audit (Neodyme)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span>Mainnet deployment (x402 Sol program)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span>Mobile wallet app launch (iOS/Android)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span>First 10 pilot devices (vending machines in San Francisco)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="relative pl-20">
            <div className="absolute left-5 top-4 w-6 h-6 rounded-full bg-gray-800 border-4 border-black flex items-center justify-center">
              <Clock className="w-4 h-4 text-black" />
            </div>
            <Card className="border-gray-700/30 bg-gray-800/10">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">Q2 2026</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800/20 text-gray-300 border border-gray-700/30">
                    In Progress
                  </span>
                </div>
                <CardTitle className="text-2xl text-foreground">Ecosystem Growth</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Developer tools and community expansion.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>SDK releases (Python, Rust, JavaScript)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>100+ device registrations (vending, parking, EV chargers)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Integration with Phantom/Solflare wallets (WalletConnect support)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Developer hackathon ($100k prize pool)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="relative pl-20">
            <div className="absolute left-5 top-4 w-6 h-6 rounded-full bg-gray-800 border-4 border-black flex items-center justify-center">
              <Circle className="w-3 h-3 text-black" />
            </div>
            <Card className="border-gray-700/30 bg-gray-800/10">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">Q3 2026</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800/20 text-gray-300 border border-gray-700/30">
                    Planned
                  </span>
                </div>
                <CardTitle className="text-2xl text-foreground">Enterprise Partnerships</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Large-scale deployments and optimization.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Partnership with vending machine manufacturer (10,000 unit deployment)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Smart city pilot (Miami, Austin, or Dubai)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Layer 2 optimizations (compressed accounts for 10x cost reduction)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="relative pl-20">
            <div className="absolute left-5 top-4 w-6 h-6 rounded-full bg-gray-800 border-4 border-black flex items-center justify-center">
              <Circle className="w-3 h-3 text-black" />
            </div>
            <Card className="border-gray-700/30 bg-gray-800/10">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">Q4 2026</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800/20 text-gray-300 border border-gray-700/30">
                    Planned
                  </span>
                </div>
                <CardTitle className="text-2xl text-foreground">Global Expansion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Achieving scale and decentralization.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>1M+ registered devices</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Cross-chain bridge (USDC on Ethereum → Solana)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Decentralized governance activation (DAO launch)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="relative pl-20">
            <div className="absolute left-5 top-4 w-6 h-6 rounded-full bg-gray-800 border-4 border-black flex items-center justify-center">
              <Circle className="w-3 h-3 text-black" />
            </div>
            <Card className="border-gray-700/30 bg-gray-800/10">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">2027+</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800/20 text-gray-300 border border-gray-700/30">
                    Vision
                  </span>
                </div>
                <CardTitle className="text-2xl text-foreground">Mass Adoption</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Industry-wide transformation and integration.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>10M+ devices across 50 countries</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Autonomous vehicle integrations (Tesla, Waymo API)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Energy grid integration (peer-to-peer energy trading)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>X402 listing on major exchanges (Coinbase, Binance)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="space-y-8" data-testid="section-targets">
          <h2 className="text-3xl font-bold text-foreground">Key Targets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Year 1 (2026)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-4xl font-bold text-gray-300">100K</div>
                <p className="text-sm text-muted-foreground">Registered devices</p>
                <div className="pt-2 border-t border-gray-700/20 space-y-1 text-xs text-muted-foreground">
                  <div>• 10M transactions</div>
                  <div>• $10M transaction volume</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Year 2 (2027)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-4xl font-bold text-gray-300">1M</div>
                <p className="text-sm text-muted-foreground">Registered devices</p>
                <div className="pt-2 border-t border-gray-700/20 space-y-1 text-xs text-muted-foreground">
                  <div>• 500M transactions</div>
                  <div>• $500M transaction volume</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Year 3 (2028)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-4xl font-bold text-gray-300">10M</div>
                <p className="text-sm text-muted-foreground">Registered devices</p>
                <div className="pt-2 border-t border-gray-700/20 space-y-1 text-xs text-muted-foreground">
                  <div>• Break-even with fee revenue</div>
                  <div>• Global market leadership</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-gray-700/10">
          <Link href="/tokenomics">
            <Button variant="ghost" className="hover-elevate" data-testid="button-back">
              ← Back to Tokenomics
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="ghost" className="text-gray-300 hover-elevate" data-testid="button-next">
              Try Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
