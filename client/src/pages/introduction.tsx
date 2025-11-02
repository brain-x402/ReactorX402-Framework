import { Link } from "wouter";
import { ArrowRight, TrendingUp, AlertCircle, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function Introduction() {
  useEffect(() => {
    document.title = "Introduction - BrainX";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900/50 to-black">
      <div className="max-w-4xl mx-auto px-8 py-24 space-y-16">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-page-title">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Introduction
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Understanding the DePIN revolution and why IoT payments need a fundamental transformation.
          </p>
        </div>

        <section className="space-y-6" data-testid="section-depin">
          <h2 className="text-3xl font-bold text-foreground">The Rise of DePIN</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The convergence of blockchain technology and physical infrastructure is unlocking a new economic paradigm. <strong className="text-foreground">Decentralized Physical Infrastructure Networks (DePIN)</strong> enable peer-to-peer coordination of real-world assets — from IoT sensors and wireless networks to energy grids and compute resources — without centralized intermediaries.
          </p>
          
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="w-5 h-5 text-white" />
                Market Momentum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                DePIN projects like Helium (wireless), Hivemapper (mapping), and Render (GPU compute) have collectively reached <strong className="text-foreground">$10B+ in market capitalization</strong>, demonstrating demand for crypto-native infrastructure coordination.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6" data-testid="section-iot-growth">
          <h2 className="text-3xl font-bold text-foreground">IoT Market Growth</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The global IoT market presents a <strong className="text-white">$1.5 trillion opportunity by 2027</strong>, with key verticals experiencing explosive growth:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Smart Cities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-white">$320B</div>
                <p className="text-sm text-muted-foreground">Parking meters, EV charging, public transit</p>
              </CardContent>
            </Card>
            
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Industrial IoT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-white">$280B</div>
                <p className="text-sm text-muted-foreground">Equipment rental, usage-based machinery</p>
              </CardContent>
            </Card>
            
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Connected Vehicles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-white">$215B</div>
                <p className="text-sm text-muted-foreground">Toll roads, car washes, autonomous delivery</p>
              </CardContent>
            </Card>
            
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Smart Retail</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-white">$180B</div>
                <p className="text-sm text-muted-foreground">Vending machines, smart lockers, self-checkout</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6" data-testid="section-payment-bottleneck">
          <h2 className="text-3xl font-bold text-foreground">The IoT Payment Bottleneck</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Despite DePIN's momentum, a critical bottleneck persists: <strong className="text-foreground">payment infrastructure</strong>. Current IoT payment systems fall into three categories, all with severe limitations:
          </p>
          
          <div className="space-y-6">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <AlertCircle className="w-5 h-5 text-white" />
                  Centralized Payment Processors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span><strong className="text-foreground">Fees:</strong> 2.9% + $0.30 per transaction (prohibitive for $0.01 transactions)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span><strong className="text-foreground">Latency:</strong> 2-3 day settlement incompatible with real-time interactions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span><strong className="text-foreground">Geographic Restrictions:</strong> Limited availability in emerging markets</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span><strong className="text-foreground">Single Point of Failure:</strong> Censorship risk, downtime vulnerability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <AlertCircle className="w-5 h-5 text-white" />
                  Traditional Blockchain Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span><strong className="text-foreground">High Gas Fees:</strong> $5-$50 per transaction during congestion</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span><strong className="text-foreground">Slow Finality:</strong> 12-second block times insufficient for real-time vending</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span><strong className="text-foreground">Poor UX:</strong> Complex wallet management, private key custody barriers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <AlertCircle className="w-5 h-5 text-white" />
                  Subscription/Pre-funding Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span><strong className="text-foreground">Capital Inefficiency:</strong> Users must lock funds in advance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span><strong className="text-foreground">Vendor Lock-in:</strong> Prepaid credits non-transferable between services</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span><strong className="text-foreground">Friction:</strong> Signup friction reduces conversion rates by 40-60%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6" data-testid="section-introducing-x402pay">
          <h2 className="text-3xl font-bold text-foreground">Introducing BrainX</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <strong className="text-foreground">BrainX</strong> solves these challenges by implementing the <strong className="text-white">x402 protocol</strong> on Solana — the world's fastest blockchain with proven 40,000+ TPS throughput and sub-second finality.
          </p>
          
          <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-gray-400/10 to-gray-400/10 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3">
              <Wifi className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold text-foreground">The "Get-as-You-Go" Innovation</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Instead of "pay first, receive later" (subscriptions) or "pay per use after the fact" (invoicing), BrainX enables <strong className="text-foreground">instant service delivery with simultaneous micropayment settlement</strong>.
            </p>
            <p className="text-muted-foreground">
              A vending machine dispenses a soda the moment your wallet approves a $0.75 USDC transfer. An IoT sensor streams data as micropayments flow sub-second. No pre-funding. No delays. Pure, frictionless commerce.
            </p>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-gray-700/10">
          <Link href="/executive-summary">
            <Button variant="ghost" className="hover-elevate" data-testid="button-back">
              ← Back to Executive Summary
            </Button>
          </Link>
          <Link href="/solution">
            <Button variant="ghost" className="text-white hover-elevate" data-testid="button-next">
              Next: Solution Overview
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
