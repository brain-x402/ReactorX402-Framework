import { Link } from "wouter";
import { ArrowRight, Coins, PieChart, TrendingUp, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function Tokenomics() {
  useEffect(() => {
    document.title = "Tokenomics - x402Pay";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-6xl mx-auto px-8 py-24 space-y-16">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-page-title">
            <span className="bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent">
              Tokenomics
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            X402 token powers the ecosystem through staking, governance, fee discounts, and liquidity incentives.
          </p>
        </div>

        <section className="space-y-8" data-testid="section-overview">
          <h2 className="text-3xl font-bold text-foreground">X402 Token Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Total Supply</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent">
                  1,000,000,000
                </div>
                <p className="text-sm text-muted-foreground mt-2">X402 tokens</p>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Decimals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-300">9</div>
                <p className="text-sm text-muted-foreground mt-2">Standard precision</p>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Blockchain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-300">Solana</div>
                <p className="text-sm text-muted-foreground mt-2">SPL token standard</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8" data-testid="section-distribution">
          <h2 className="text-3xl font-bold text-foreground">Token Distribution</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-foreground">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-gray-300" />
                      Community Rewards
                    </div>
                    <span className="text-2xl font-bold text-gray-300">40%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-muted-foreground">400M X402</div>
                  <div className="w-full bg-black/50 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">4 years (25% annually)</p>
                </CardContent>
              </Card>

              <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-foreground">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-gray-300" />
                      Team & Advisors
                    </div>
                    <span className="text-2xl font-bold text-gray-300">20%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-muted-foreground">200M X402</div>
                  <div className="w-full bg-black/50 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">4 years, 1yr cliff</p>
                </CardContent>
              </Card>

              <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-foreground">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-gray-300" />
                      Investors (Seed)
                    </div>
                    <span className="text-2xl font-bold text-gray-300">15%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-muted-foreground">150M X402</div>
                  <div className="w-full bg-black/50 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">3 years, 6mo cliff</p>
                </CardContent>
              </Card>

              <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-foreground">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-gray-300" />
                      Ecosystem Grants
                    </div>
                    <span className="text-2xl font-bold text-gray-300">15%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-muted-foreground">150M X402</div>
                  <div className="w-full bg-black/50 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">On-demand (DAO governed)</p>
                </CardContent>
              </Card>

              <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-foreground">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-gray-300" />
                      Treasury Reserve
                    </div>
                    <span className="text-2xl font-bold text-gray-300">10%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-muted-foreground">100M X402</div>
                  <div className="w-full bg-black/50 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">Perpetual (protocol-owned liquidity)</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-center">
              <Card className="border-gray-700/20 bg-gray-800/5 w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <PieChart className="w-5 h-5 text-gray-300" />
                    Distribution Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative w-full h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-bold bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent">
                          100%
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Fixed Supply</p>
                        <p className="text-xs text-muted-foreground">Mint authority burned</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-8" data-testid="section-utility">
          <h2 className="text-3xl font-bold text-foreground">Utility Mechanisms</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="w-5 h-5 text-gray-300" />
                  1. Staking for Device Operators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Required collateral for device registration
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Earn 8-12% APY from transaction fees</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Build reputation through successful transactions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Slashed for fraud or non-delivery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Coins className="w-5 h-5 text-gray-300" />
                  2. Governance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  1 X402 = 1 vote on protocol upgrades
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Fee adjustments and rate changes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Relay node selection and approval</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Grant approvals for ecosystem development</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="w-5 h-5 text-gray-300" />
                  3. Fee Discounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Tiered discount system based on holdings
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Hold 10,000 X402: 25% fee discount</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Hold 50,000 X402: 50% fee discount</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Encourages long-term holding</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Coins className="w-5 h-5 text-gray-300" />
                  4. Liquidity Mining
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Provide X402-USDC liquidity on DEXs
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Earn 20% APY on Raydium/Orca</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Protocol-owned liquidity reduces slippage</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>Additional trading fee income</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8" data-testid="section-revenue">
          <h2 className="text-3xl font-bold text-foreground">Revenue Model</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Coins className="w-5 h-5 text-gray-300" />
                  Protocol Fees
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-700/20 bg-gray-800/5">
                  <div className="text-4xl font-bold text-gray-300 mb-2">0.1%</div>
                  <p className="text-sm text-muted-foreground">Fee on all USDC transactions</p>
                  <p className="text-xs text-muted-foreground mt-2">Example: $0.001 on $1.00 payment</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border border-gray-700/20 bg-gray-800/5">
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="w-4 h-4 text-gray-300" />
                      <p className="text-xs font-semibold text-gray-300">50% Burned</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Deflationary mechanism</p>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-700/20 bg-gray-800/5">
                    <div className="flex items-center gap-2 mb-1">
                      <Coins className="w-4 h-4 text-gray-300" />
                      <p className="text-xs font-semibold text-gray-300">50% Treasury</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Protocol development</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="w-5 h-5 text-gray-300" />
                  Projected Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700/20">
                        <th className="text-left p-2 text-foreground">Year</th>
                        <th className="text-left p-2 text-foreground">Volume</th>
                        <th className="text-left p-2 text-foreground">Fee (0.1%)</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-gray-700/10">
                        <td className="p-2">2026</td>
                        <td className="p-2">$10M</td>
                        <td className="p-2 text-gray-300">$10k</td>
                      </tr>
                      <tr className="border-b border-gray-700/10">
                        <td className="p-2">2027</td>
                        <td className="p-2">$500M</td>
                        <td className="p-2 text-gray-300">$500k</td>
                      </tr>
                      <tr>
                        <td className="p-2">2028</td>
                        <td className="p-2">$5B</td>
                        <td className="p-2 text-gray-300">$5M</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-gray-700/10">
          <Link href="/sdk">
            <Button variant="ghost" className="hover-elevate" data-testid="button-back">
              ← Back to SDK
            </Button>
          </Link>
          <Link href="/roadmap">
            <Button variant="ghost" className="text-gray-300 hover-elevate" data-testid="button-next">
              Next: Roadmap
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
