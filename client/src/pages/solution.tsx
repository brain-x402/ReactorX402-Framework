import { Link } from "wouter";
import { ArrowRight, Server, Database, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function Solution() {
  useEffect(() => {
    document.title = "Solution Overview - x402Pay";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-6xl mx-auto px-8 py-24 space-y-16">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-page-title">
            <span className="bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent">
              Solution Overview
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            High-level architecture of x402Pay's Solana-based micropayment infrastructure for IoT devices.
          </p>
        </div>

        <section className="space-y-8" data-testid="section-architecture">
          <h2 className="text-3xl font-bold text-foreground">High-Level Architecture</h2>
          
          <div className="p-8 rounded-xl border border-gray-700/20 bg-gray-800/5 backdrop-blur-sm">
            <pre className="text-sm text-muted-foreground font-mono overflow-x-auto">
{`┌─────────────────────────────────────────────────────────────┐
│                    x402Pay Ecosystem                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐│
│  │  IoT Device  │◄────►│  x402 Sol    │◄────►│  Solana   ││
│  │  (Vending/   │      │  Program     │      │  Validator││
│  │   Sensor)    │      │  (Smart      │      │  Network  ││
│  └──────────────┘      │  Contract)   │      └───────────┘│
│         │               └──────────────┘             │     │
│         │                      │                     │     │
│         ▼                      ▼                     ▼     │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐│
│  │  Device      │      │  Payment     │      │  USDC     ││
│  │  Registry    │      │  Validator   │      │  Treasury ││
│  │  (On-chain)  │      │  Nodes       │      │  (SPL)    ││
│  └──────────────┘      └──────────────┘      └───────────┘│
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │       SDK Layer (Python, Rust, JavaScript)           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        </section>

        <section className="space-y-8" data-testid="section-components">
          <h2 className="text-3xl font-bold text-foreground">Component Breakdown</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Server className="w-5 h-5 text-gray-300" />
                  x402 Sol Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Core payment logic implementing HTTP 402 "Payment Required" flow
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Escrows USDC, validates device signatures</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Releases funds atomically</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Sub-500ms execution time</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Database className="w-5 h-5 text-gray-300" />
                  Device Registry
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Immutable registry of verified IoT devices with DID credentials
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Reputation scores based on transaction history</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Slashing conditions for fraudulent devices</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>On-chain verifiable credentials</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="w-5 h-5 text-gray-300" />
                  Payment Validator Nodes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Off-chain watchers monitoring device requests
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Submit transaction proofs to x402 Sol program</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Earn X402 rewards for honest validation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Distributed globally for low latency</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Zap className="w-5 h-5 text-gray-300" />
                  USDC Treasury
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Multi-sig controlled treasury for liquidity provision
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Automated USDC↔SOL conversion for gas fees</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Emergency pause mechanisms</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>SPL token standard integration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8" data-testid="section-why-solana">
          <h2 className="text-3xl font-bold text-foreground">Why Solana?</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700/20">
                  <th className="p-4 text-foreground font-semibold">Requirement</th>
                  <th className="p-4 text-foreground font-semibold">Why It Matters</th>
                  <th className="p-4 text-foreground font-semibold">Solana Solution</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">Sub-second Finality</td>
                  <td className="p-4">Vending machines can't wait 15 seconds</td>
                  <td className="p-4 text-gray-300">400ms slots, optimistic concurrency</td>
                </tr>
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">Low Fees</td>
                  <td className="p-4">$0.01 transactions need &lt;$0.001 fees</td>
                  <td className="p-4 text-gray-300">$0.00005 average transaction cost</td>
                </tr>
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">High Throughput</td>
                  <td className="p-4">1M devices × 10 tx/day = 10M daily tx</td>
                  <td className="p-4 text-gray-300">40,000+ TPS proven capacity</td>
                </tr>
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">Stable Asset Support</td>
                  <td className="p-4">Vendors need predictable revenue</td>
                  <td className="p-4 text-gray-300">Native SPL-USDC with Circle partnership</td>
                </tr>
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">Developer Ecosystem</td>
                  <td className="p-4">Need audited frameworks and tooling</td>
                  <td className="p-4 text-gray-300">Anchor framework, 10K+ developers</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground">Institutional Adoption</td>
                  <td className="p-4">Enterprises need credible infrastructure</td>
                  <td className="p-4 text-gray-300">Visa, Shopify, DRW partnerships</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-gray-700/10">
          <Link href="/introduction">
            <Button variant="ghost" className="hover-elevate" data-testid="button-back">
              ← Back to Introduction
            </Button>
          </Link>
          <Link href="/x402-sol">
            <Button variant="ghost" className="text-gray-300 hover-elevate" data-testid="button-next">
              Next: x402 Sol Protocol
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
