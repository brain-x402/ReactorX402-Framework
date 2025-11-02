import { Link } from "wouter";
import { ArrowRight, Shield, Award, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function DeviceIdentity() {
  useEffect(() => {
    document.title = "Device Identity - BrainX";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900/50 to-black">
      <div className="max-w-6xl mx-auto px-8 py-24 space-y-16">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-page-title">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Device Identity and Trust Layer
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            On-chain device registry with verifiable credentials, reputation scoring, and Sybil attack prevention through staking mechanisms.
          </p>
        </div>

        <section className="space-y-8" data-testid="section-challenge">
          <h2 className="text-3xl font-bold text-foreground">The Challenge: Sybil Attacks in IoT</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Open payment systems face a critical challenge: <strong className="text-foreground">how to prevent malicious actors from flooding the network with fake devices</strong> to drain user funds or spam the network.
          </p>
          
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="w-5 h-5 text-white" />
                Traditional Solutions Fall Short
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Traditional solutions (KYC, centralized approval) contradict decentralization principles. BrainX solves this with an <strong className="text-foreground">on-chain device registry</strong> inspired by Ethereum's ERC-8004 standard, adapted for Solana's performance requirements.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8" data-testid="section-registry">
          <h2 className="text-3xl font-bold text-foreground">Solana Device Registry (SDR)</h2>
          <p className="text-lg text-muted-foreground">
            Each IoT device in the BrainX ecosystem must register on-chain before accepting payments:
          </p>
          
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Device Registry Data Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground font-mono overflow-x-auto p-4 rounded-lg bg-black/50">
{`pub struct DeviceRegistry {
    pub device_id: Pubkey,              // Device public key (32 bytes)
    pub owner: Pubkey,                  // Human/org that deployed device
    pub device_type: DeviceType,        // Vending, Sensor, Vehicle, etc.
    pub metadata_uri: String,           // IPFS/Arweave link to device specs
    pub verification_key: [u8; 32],     // Public key for service proofs
    pub stake_amount: u64,              // X402 tokens staked (slashable)
    pub reputation_score: u16,          // 0-1000 score
    pub successful_transactions: u64,
    pub failed_transactions: u64,
    pub registered_at: i64,
    pub is_verified: bool,              // Admin-approved for high-value services
    pub is_active: bool,
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8" data-testid="section-staking">
          <h2 className="text-3xl font-bold text-foreground">Staking Requirements</h2>
          <p className="text-lg text-muted-foreground">
            To register a device, operators must stake <strong className="text-foreground">X402 tokens</strong> proportional to device capabilities:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-white/10 bg-white/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="w-5 h-5 text-white" />
                  Low-Value Sensor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-white">100</div>
                  <div className="text-sm text-muted-foreground">X402 minimum stake</div>
                </div>
                <p className="text-sm text-muted-foreground pt-2 border-t border-white/10">
                  <strong className="text-foreground">Slashing:</strong> 3 failed deliveries
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="w-5 h-5 text-white" />
                  Vending Machine
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-white">500</div>
                  <div className="text-sm text-muted-foreground">X402 minimum stake</div>
                </div>
                <p className="text-sm text-muted-foreground pt-2 border-t border-white/10">
                  <strong className="text-foreground">Slashing:</strong> 5 failed deliveries or fraud proof
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="w-5 h-5 text-white" />
                  Autonomous Vehicle
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-white">2,000</div>
                  <div className="text-sm text-muted-foreground">X402 minimum stake</div>
                </div>
                <p className="text-sm text-muted-foreground pt-2 border-t border-white/10">
                  <strong className="text-foreground">Slashing:</strong> Single safety incident
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="w-5 h-5 text-white" />
                  Industrial Equipment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-white">5,000</div>
                  <div className="text-sm text-muted-foreground">X402 minimum stake</div>
                </div>
                <p className="text-sm text-muted-foreground pt-2 border-t border-white/10">
                  <strong className="text-foreground">Slashing:</strong> SLA breach (99.9% uptime)
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3">Slashing Mechanism</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-white">•</span>
                  <span>Failed transactions reduce stake by 10-50% depending on severity</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white">•</span>
                  <span>Slashed tokens distributed to affected users as compensation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white">•</span>
                  <span>Devices below minimum stake threshold are automatically deactivated</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8" data-testid="section-reputation">
          <h2 className="text-3xl font-bold text-foreground">Reputation Scoring System</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-white" />
                  Elite
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-white">900-1000</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ Blue checkmark badge</li>
                  <li>✓ 50% stake reduction</li>
                  <li>✓ Premium pricing allowed</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Trusted
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-white">700-899</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ Green badge</li>
                  <li>✓ 25% stake reduction</li>
                  <li>✓ Priority slots in congestion</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  Standard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-foreground">500-699</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• No special treatment</li>
                  <li>• Standard stake requirements</li>
                  <li>• Normal transaction fees</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-white" />
                  High Risk
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-white">0-299</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>⚠ Red flag warning</li>
                  <li>⚠ Pre-approval for high-value tx</li>
                  <li>⚠ Increased monitoring</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Reputation Score Formula</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground font-mono overflow-x-auto p-4 rounded-lg bg-black/50">
{`pub fn update_reputation_score(&mut self) {
    let total_tx = self.successful_transactions + self.failed_transactions;
    if total_tx == 0 {
        self.reputation_score = 500; // Neutral starting score
        return;
    }
    
    let success_rate = (self.successful_transactions as f64 / total_tx as f64) * 1000.0;
    let volume_bonus = (total_tx as f64).ln() * 10.0; // Logarithmic bonus
    let stake_bonus = (self.stake_amount as f64 / 1_000_000.0).min(100.0);
    
    self.reputation_score = (success_rate + volume_bonus + stake_bonus).min(1000.0) as u16;
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8" data-testid="section-did">
          <h2 className="text-3xl font-bold text-foreground">Verifiable Credentials (W3C DID Standard)</h2>
          <p className="text-lg text-muted-foreground">
            Each device possesses a <strong className="text-foreground">Decentralized Identifier (DID)</strong> compliant with W3C standards:
          </p>
          
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">DID Document Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground font-mono overflow-x-auto p-4 rounded-lg bg-black/50">
{`{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:sol:mainnet:7Xn9...",
  "verificationMethod": [{
    "id": "did:sol:mainnet:7Xn9...#keys-1",
    "type": "Ed25519VerificationKey2020",
    "controller": "did:sol:mainnet:7Xn9...",
    "publicKeyMultibase": "z6Mk..."
  }],
  "service": [{
    "id": "did:sol:mainnet:7Xn9...#vending",
    "type": "VendingMachine",
    "serviceEndpoint": "https://device.x402pay.io/api/v1",
    "metadata": {
      "location": "37.7749,-122.4194",
      "products": ["soda", "water", "snacks"],
      "priceRange": "0.50-3.00 USDC"
    }
  }]
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8" data-testid="section-privacy">
          <h2 className="text-3xl font-bold text-foreground">Privacy Considerations</h2>
          <p className="text-lg text-muted-foreground">
            While the registry is public, device <strong className="text-foreground">location and operational data</strong> can be privacy-sensitive:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-white/10 bg-white/5 hover-elevate">
              <CardHeader>
                <CardTitle className="text-foreground">Metadata Encryption</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Store sensitive details on IPFS with user-only decryption keys
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 hover-elevate">
              <CardHeader>
                <CardTitle className="text-foreground">Zero-Knowledge Proofs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Devices prove "I'm within 5 miles of user" without revealing exact location
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 hover-elevate">
              <CardHeader>
                <CardTitle className="text-foreground">Aggregated Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  On-chain data shows "1000 vending machines in SF" without individual IDs
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-gray-700/10">
          <Link href="/x402-sol">
            <Button variant="ghost" className="hover-elevate" data-testid="button-back">
              ← Back to x402 Sol
            </Button>
          </Link>
          <Link href="/sdk">
            <Button variant="ghost" className="text-white hover-elevate" data-testid="button-next">
              Next: SDK & Dev Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
