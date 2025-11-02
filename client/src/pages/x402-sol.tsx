import { Link } from "wouter";
import { ArrowRight, Zap, Clock, CheckCircle, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

export default function X402Sol() {
  useEffect(() => {
    document.title = "x402 Sol Protocol - x402Pay";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-6xl mx-auto px-8 py-24 space-y-16">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-page-title">
            <span className="bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent">
              x402 Sol: The Get-as-You-Go Protocol
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Unlike traditional "pay-as-you-go" models requiring upfront payments or subscriptions, x402 Sol enables a "get-as-you-go" paradigm where users and machines instantly receive services upon request, with micropayments settled sub-second via Solana's high throughput.
          </p>
        </div>

        <section className="space-y-8" data-testid="section-paradigm-shift">
          <h2 className="text-3xl font-bold text-foreground">The Paradigm Shift</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">❌ Traditional "Pay-as-You-Go"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-gray-300 font-semibold">1.</span>
                    <span>User signs up and adds credit card</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-300 font-semibold">2.</span>
                    <span>Pre-authorization hold placed on card</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-300 font-semibold">3.</span>
                    <span>Service delivered</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-300 font-semibold">4.</span>
                    <span>Charge posted days later</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-300 font-semibold">5.</span>
                    <span>Settlement in 2-3 business days</span>
                  </li>
                </ol>
                <div className="pt-4 border-t border-gray-700/20">
                  <p className="text-sm font-semibold text-gray-300 mb-2">Problems:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Friction (signup required)</li>
                    <li>• Latency (2-3 days)</li>
                    <li>• High fees (2.9%)</li>
                    <li>• Pre-authorization lock ($50+ holds)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">✅ x402Pay "Get-as-You-Go"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-gray-300 font-semibold">1.</span>
                    <span>Device broadcasts service offer via HTTP 402</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-300 font-semibold">2.</span>
                    <span>User wallet auto-approves micropayment (one tap)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-300 font-semibold">3.</span>
                    <span><strong className="text-foreground">Service and payment happen simultaneously</strong> (sub-second)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-300 font-semibold">4.</span>
                    <span>Settlement is instant and final</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-300 font-semibold">5.</span>
                    <span>No signup, no pre-authorization, no waiting</span>
                  </li>
                </ol>
                <div className="pt-4 border-t border-gray-700/20">
                  <p className="text-sm font-semibold text-gray-300 mb-2">Benefits:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Zero friction (no signup)</li>
                    <li>• Instant (sub-second)</li>
                    <li>• Negligible fees ($0.00005)</li>
                    <li>• No capital lock-up</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8" data-testid="section-http-402">
          <h2 className="text-3xl font-bold text-foreground">HTTP 402 Payment Required</h2>
          <p className="text-lg text-muted-foreground">
            The HTTP standard includes status code <code className="px-2 py-1 rounded bg-gray-800/10 text-gray-300 font-mono text-sm">402 Payment Required</code>, originally reserved for future digital payment systems. x402Pay brings this vision to reality:
          </p>
          
          <Tabs defaultValue="flow" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="flow" data-testid="tab-flow">Transaction Flow</TabsTrigger>
              <TabsTrigger value="timeline" data-testid="tab-timeline">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="flow" className="mt-6">
              <Card className="border-gray-700/20 bg-gray-800/5">
                <CardContent className="p-6">
                  <pre className="text-sm text-muted-foreground font-mono overflow-x-auto">
{`IoT Device → User: HTTP 402 (service metadata + Solana tx template)
User Wallet → Solana: Sign & submit USDC transfer + device instruction
x402 Sol Program → Validates signature, transfers USDC, emits receipt
Device Backend → Monitors Solana, sees confirmed tx, delivers service`}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-6">
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-24 text-gray-300 font-mono text-sm font-semibold">T+0ms</div>
                  <div className="flex-1 p-4 rounded-lg border border-gray-700/20 bg-gray-800/5">
                    <p className="text-foreground font-medium">Device sends 402 response with payment request</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-24 text-gray-300 font-mono text-sm font-semibold">T+50ms</div>
                  <div className="flex-1 p-4 rounded-lg border border-gray-700/20 bg-gray-800/5">
                    <p className="text-foreground font-medium">User wallet signs transaction</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-24 text-gray-300 font-mono text-sm font-semibold">T+100ms</div>
                  <div className="flex-1 p-4 rounded-lg border border-gray-700/20 bg-gray-800/5">
                    <p className="text-foreground font-medium">Transaction submitted to Solana RPC</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-24 text-gray-300 font-mono text-sm font-semibold">T+500ms</div>
                  <div className="flex-1 p-4 rounded-lg border border-gray-700/20 bg-gray-800/5">
                    <p className="text-foreground font-medium">Transaction confirmed (slot finalized)</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-24 text-gray-300 font-mono text-sm font-semibold">T+600ms</div>
                  <div className="flex-1 p-4 rounded-lg border border-gray-700/20 bg-gray-800/5">
                    <p className="text-foreground font-medium">Device backend queries Solana, sees payment</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-24 text-gray-300 font-mono text-sm font-semibold">T+700ms</div>
                  <div className="flex-1 p-4 rounded-lg border border-gray-700/20 bg-gray-800/5">
                    <p className="text-foreground font-medium">✅ Service delivered (vending machine dispenses, sensor sends data)</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-lg border border-gray-700/30 bg-gray-800/10">
                <p className="text-lg font-semibold text-foreground">
                  Total time: ~700ms from request to delivery
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  This is <strong className="text-gray-300">3,000x faster</strong> than credit card settlement
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="space-y-8" data-testid="section-program-architecture">
          <h2 className="text-3xl font-bold text-foreground">x402 Sol Program Architecture</h2>
          <p className="text-lg text-muted-foreground">
            The x402 Sol program is a Rust-based Solana program (equivalent to a smart contract) with three core instructions:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Code className="w-5 h-5 text-gray-300" />
                  InitializePayment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Escrows USDC from user to payment account with device validation</p>
                <div className="pt-2 border-t border-gray-700/20">
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Validates amount & device registry</li>
                    <li>• Creates payment escrow PDA</li>
                    <li>• Transfers USDC to escrow</li>
                    <li>• Emits PaymentInitialized event</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-5 h-5 text-gray-300" />
                  ConfirmService
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Device confirms service delivery and receives USDC payment</p>
                <div className="pt-2 border-t border-gray-700/20">
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Verifies device signature</li>
                    <li>• Checks payment not expired</li>
                    <li>• Transfers USDC from escrow to device</li>
                    <li>• Updates device reputation (+1)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Zap className="w-5 h-5 text-gray-300" />
                  RefundPayment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Returns USDC to user if service not delivered or payment expired</p>
                <div className="pt-2 border-t border-gray-700/20">
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Checks expiry or dispute reason</li>
                    <li>• Returns USDC to user</li>
                    <li>• Penalizes device reputation (-1)</li>
                    <li>• Emits PaymentRefunded event</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-gray-700/20 bg-gray-800/5">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Rust Pseudocode Example: InitializePayment</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground font-mono overflow-x-auto p-4 rounded-lg bg-black/50">
{`pub fn initialize_payment(
    ctx: Context<InitializePayment>,
    amount: u64,              // USDC amount (6 decimals)
    device_id: Pubkey,        // Device public key
    service_metadata: String, // IPFS hash or inline JSON
    expiry: i64,              // Unix timestamp
) -> Result<()> {
    // Validate amount is non-zero and within limits
    require!(amount > 0 && amount <= MAX_MICROPAYMENT, ErrorCode::InvalidAmount);
    
    // Verify device is registered in on-chain registry
    let device_account = &ctx.accounts.device_registry;
    require!(device_account.is_verified, ErrorCode::UnverifiedDevice);
    require!(device_account.reputation_score >= MIN_REPUTATION, ErrorCode::LowReputation);
    
    // Create payment escrow account (PDA)
    let payment = &mut ctx.accounts.payment_escrow;
    payment.amount = amount;
    payment.payer = ctx.accounts.user.key();
    payment.device = device_id;
    payment.status = PaymentStatus::Pending;
    payment.created_at = Clock::get()?.unix_timestamp;
    payment.expiry = expiry;
    
    // Transfer USDC from user to escrow
    let cpi_accounts = Transfer {
        from: ctx.accounts.user_usdc.to_account_info(),
        to: ctx.accounts.escrow_usdc.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, amount)?;
    
    emit!(PaymentInitialized {
        payment_id: payment.key(),
        amount,
        device: device_id,
        timestamp: payment.created_at,
    });
    
    Ok(())
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8" data-testid="section-performance">
          <h2 className="text-3xl font-bold text-foreground">Performance Benchmarks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Transaction Confirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-gray-300">450ms</div>
                  <div className="text-sm text-muted-foreground">avg</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Target: &lt;1 second ✅</div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Compute Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-gray-300">87k</div>
                  <div className="text-sm text-muted-foreground">CU</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Target: &lt;200k CU ✅</div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Account Rent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-gray-300">0.0023</div>
                  <div className="text-sm text-muted-foreground">SOL</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Target: &lt;0.01 SOL ✅</div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Concurrent Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-gray-300">12k</div>
                  <div className="text-sm text-muted-foreground">TPS</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Testnet proven</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8" data-testid="section-comparison">
          <h2 className="text-3xl font-bold text-foreground">Solana vs Ethereum</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700/20">
                  <th className="p-4 text-foreground font-semibold">Aspect</th>
                  <th className="p-4 text-foreground font-semibold">Ethereum (ERC-20)</th>
                  <th className="p-4 text-foreground font-semibold">Solana (x402 Sol)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">TPS</td>
                  <td className="p-4 text-gray-300">15 TPS</td>
                  <td className="p-4 text-gray-300">40,000 TPS</td>
                </tr>
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">Block Time</td>
                  <td className="p-4 text-gray-300">12 seconds</td>
                  <td className="p-4 text-gray-300">400ms</td>
                </tr>
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">Finality</td>
                  <td className="p-4 text-gray-300">~15 minutes</td>
                  <td className="p-4 text-gray-300">&lt;1 second</td>
                </tr>
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">Tx Fee</td>
                  <td className="p-4 text-gray-300">$5-$50 (gas wars)</td>
                  <td className="p-4 text-gray-300">$0.00005</td>
                </tr>
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">Language</td>
                  <td className="p-4">Solidity</td>
                  <td className="p-4 text-gray-300">Rust (memory-safe)</td>
                </tr>
                <tr className="border-b border-gray-700/10">
                  <td className="p-4 font-medium text-foreground">Minimum Payment</td>
                  <td className="p-4 text-gray-300">~$5 (due to fees)</td>
                  <td className="p-4 text-gray-300">$0.0001</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground">IoT Viability</td>
                  <td className="p-4 text-gray-300">❌ Too slow/expensive</td>
                  <td className="p-4 text-gray-300">✅ Perfect fit</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-xl border border-gray-700/30 bg-gradient-to-br from-gray-400/10 to-gray-400/10 backdrop-blur-sm">
            <p className="text-lg font-semibold text-foreground mb-2">
              <Clock className="w-5 h-5 inline-block mr-2 text-gray-300" />
              Conclusion
            </p>
            <p className="text-muted-foreground">
              Ethereum's 15 TPS and $5+ fees make IoT micropayments impossible. Solana's 40,000 TPS and sub-cent fees enable x402Pay's vision of frictionless machine-to-machine commerce.
            </p>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-gray-700/10">
          <Link href="/solution">
            <Button variant="ghost" className="hover-elevate" data-testid="button-back">
              ← Back to Solution
            </Button>
          </Link>
          <Link href="/device-identity">
            <Button variant="ghost" className="text-gray-300 hover-elevate" data-testid="button-next">
              Next: Device Identity
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
