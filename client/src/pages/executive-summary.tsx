import { Link } from "wouter";
import { TrendingUp, Zap, DollarSign, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function ExecutiveSummary() {
  useEffect(() => {
    document.title = "Executive Summary - BrainX";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900/50 to-black">
      <div className="max-w-6xl mx-auto px-8 py-24 space-y-16">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-page-title">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Executive Summary
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A comprehensive overview of BrainX's mission to revolutionize IoT micropayments through Solana blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6" data-testid="section-problem">
              <h2 className="text-3xl font-bold text-foreground">The Problem</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Internet of Things (IoT) ecosystem is experiencing explosive growth, with projections estimating <strong className="text-foreground">75 billion connected devices by 2025</strong>. However, current payment infrastructure creates critical friction points:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">High Transaction Fees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Traditional payment processors charge 2-3% fees, making micropayments economically unfeasible</p>
                  </CardContent>
                </Card>
                
                <Card className="border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Settlement Latency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Credit card settlements take 2-3 days, incompatible with real-time M2M interactions</p>
                  </CardContent>
                </Card>
                
                <Card className="border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Pre-funding Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Pay-as-you-go models force users to maintain subscriptions or prepaid balances</p>
                  </CardContent>
                </Card>
                
                <Card className="border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Limited Programmability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Legacy systems lack smart contract capabilities for automated device interactions</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6" data-testid="section-solution">
              <h2 className="text-3xl font-bold text-foreground">The Solution</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">BrainX</strong> is a Solana-native decentralized payment infrastructure purpose-built for the IoT economy. We introduce the <strong className="text-white">x402 Sol protocol</strong> — a revolutionary "get-as-you-go" paradigm that enables:
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-lg border border-white/10 bg-white/5">
                  <Zap className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Instant Service Delivery</h3>
                    <p className="text-muted-foreground">Devices/users receive services immediately, with sub-second payment settlement</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 rounded-lg border border-gray-700/20 bg-gray-800/5">
                  <DollarSign className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Zero Pre-funding</h3>
                    <p className="text-muted-foreground">No subscriptions or prepaid balances required — pay only for what you consume</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 rounded-lg border border-gray-700/20 bg-gray-800/5">
                  <TrendingUp className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Negligible Fees</h3>
                    <p className="text-muted-foreground">Solana's ~$0.00005 transaction costs enable true micropayments</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 rounded-lg border border-gray-700/20 bg-gray-800/5">
                  <Users className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">40,000 TPS Scalability</h3>
                    <p className="text-muted-foreground">Handles millions of concurrent IoT transactions without congestion</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6" data-testid="section-cta">
              <h2 className="text-3xl font-bold text-foreground">Investment Opportunity</h2>
              <div className="p-8 rounded-xl border border-gray-700/30 bg-gradient-to-br from-gray-400/10 to-gray-400/10 backdrop-blur-sm space-y-4">
                <p className="text-lg text-foreground">
                  We are raising a <strong className="text-white">$5M seed round</strong> to:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    Expand engineering team (Rust/Solana specialists)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    Deploy production mainnet infrastructure
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    Onboard 10+ enterprise IoT partners
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    Build developer ecosystem with grants and hackathons
                  </li>
                </ul>
                <div className="pt-4">
                  <Button className="bg-gradient-to-r from-gray-500 to-gray-500 hover-elevate active-elevate-2" data-testid="button-contact-investors">
                    Contact: investors@x402pay.io
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Transaction Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground mb-2">$0.00005</div>
                <p className="text-sm text-muted-foreground">vs $0.30 + 2.9% traditional</p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Settlement Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground mb-2">&lt;1 sec</div>
                <p className="text-sm text-muted-foreground">vs 2-3 days traditional</p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Throughput</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground mb-2">40,000</div>
                <p className="text-sm text-muted-foreground">Transactions per second</p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Year 3 Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground mb-2">10M</div>
                <p className="text-sm text-muted-foreground">Registered devices</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between pt-8 border-t border-gray-700/10">
          <Link href="/">
            <Button variant="ghost" className="hover-elevate" data-testid="button-back">
              ← Back to Home
            </Button>
          </Link>
          <Link href="/introduction">
            <Button variant="ghost" className="text-white hover-elevate" data-testid="button-next">
              Next: Introduction
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
