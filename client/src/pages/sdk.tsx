import { Link } from "wouter";
import { ArrowRight, Code2, Terminal, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

export default function SDK() {
  useEffect(() => {
    document.title = "SDK Documentation - x402Pay";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-6xl mx-auto px-8 py-24 space-y-16">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-page-title">
            <span className="bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent">
              SDK and Development Tools
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Enterprise-grade SDKs for rapid integration across hardware platforms and programming languages.
          </p>
        </div>

        <section className="space-y-8" data-testid="section-overview">
          <h2 className="text-3xl font-bold text-foreground">Overview</h2>
          <p className="text-lg text-muted-foreground">
            x402Pay provides enterprise-grade SDKs for rapid integration across hardware platforms and programming languages.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Code2 className="w-5 h-5 text-gray-300" />
                  Python SDK
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Recommended for IoT edge devices
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Raspberry Pi</div>
                  <div>• NVIDIA Jetson</div>
                  <div>• Intel NUC</div>
                  <div>• Generic Linux servers</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Terminal className="w-5 h-5 text-gray-300" />
                  Rust SDK
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  High-performance industrial IoT
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Embedded systems</div>
                  <div>• Autonomous vehicles</div>
                  <div>• Industrial sensors</div>
                  <div>• Real-time systems</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700/20 bg-gray-800/5 hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Book className="w-5 h-5 text-gray-300" />
                  JavaScript SDK
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Web-connected devices & browsers
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Web dashboards</div>
                  <div>• Browser device control</div>
                  <div>• Node.js servers</div>
                  <div>• Web3 integrations</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8" data-testid="section-examples">
          <h2 className="text-3xl font-bold text-foreground">Code Examples</h2>
          
          <Tabs defaultValue="python" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="python" data-testid="tab-python">Python</TabsTrigger>
              <TabsTrigger value="rust" data-testid="tab-rust">Rust</TabsTrigger>
              <TabsTrigger value="javascript" data-testid="tab-javascript">JavaScript</TabsTrigger>
            </TabsList>
            
            <TabsContent value="python" className="mt-6 space-y-6">
              <Card className="border-gray-700/20 bg-gray-800/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-muted-foreground font-mono p-4 rounded-lg bg-black/50">
{`pip install x402pay-sdk`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="border-gray-700/20 bg-gray-800/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Vending Machine Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs text-muted-foreground font-mono overflow-x-auto p-4 rounded-lg bg-black/50">
{`from x402pay import BrainX402Client, PaymentRequest
from solders.keypair import Keypair
import os

# Initialize client with device keypair
device_key = Keypair.from_base58_string(os.getenv("DEVICE_PRIVATE_KEY"))
client = BrainX402Client(
    device_keypair=device_key,
    network="mainnet",
    rpc_url="https://api.mainnet-beta.solana.com"
)

# Handle incoming payment request
async def handle_purchase(product_id: str, user_pubkey: str):
    # Create payment request
    payment = PaymentRequest(
        amount_usdc=1.50,  # $1.50 USDC
        device_id=device_key.pubkey(),
        user_wallet=user_pubkey,
        service_metadata={
            "product": product_id,
            "timestamp": int(time.time()),
        },
        expiry_seconds=300,  # 5 minute expiry
    )
    
    # Wait for payment confirmation (sub-second)
    receipt = await client.await_payment(payment, timeout=2.0)
    
    if receipt.status == "confirmed":
        # Deliver product via hardware GPIO
        dispense_product(product_id)
        
        # Confirm service delivery on-chain
        await client.confirm_service(
            payment_id=receipt.payment_id,
            service_proof=generate_proof(product_id)
        )
        print(f"✅ Payment received: {receipt.amount} USDC")
    else:
        print("❌ Payment failed or expired")`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="border-gray-700/20 bg-gray-800/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Raspberry Pi GPIO Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs text-muted-foreground font-mono overflow-x-auto p-4 rounded-lg bg-black/50">
{`import RPi.GPIO as GPIO
from x402pay import BrainX402Client

# Configure GPIO pins for vending motor
GPIO.setmode(GPIO.BCM)
MOTOR_PIN = 17
GPIO.setup(MOTOR_PIN, GPIO.OUT)

async def dispense_soda():
    # Request payment first
    payment = PaymentRequest(amount_usdc=1.25, ...)
    receipt = await client.await_payment(payment, timeout=2.0)
    
    if receipt.status == "confirmed":
        # Activate motor for 3 seconds
        GPIO.output(MOTOR_PIN, GPIO.HIGH)
        await asyncio.sleep(3)
        GPIO.output(MOTOR_PIN, GPIO.LOW)
        
        # Mark delivery complete
        await client.confirm_service(receipt.payment_id, proof="dispensed")`}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rust" className="mt-6 space-y-6">
              <Card className="border-gray-700/20 bg-gray-800/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-muted-foreground font-mono p-4 rounded-lg bg-black/50">
{`[dependencies]
x402pay-sdk = "0.2.1"
solana-sdk = "1.18"
tokio = { version = "1", features = ["full"] }`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="border-gray-700/20 bg-gray-800/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">IoT Sensor Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs text-muted-foreground font-mono overflow-x-auto p-4 rounded-lg bg-black/50">
{`use x402pay_sdk::{BrainX402Client, PaymentRequest, DeviceType};
use solana_sdk::signature::Keypair;

#[tokio::main]
async fn main() -> Result<()> {
    let device_keypair = Keypair::from_base58_string(&std::env::var("DEVICE_KEY")?);
    let client = BrainX402Client::new(device_keypair, "mainnet").await?;
    
    // Register device
    client.register_device(
        DeviceType::Sensor,
        "ipfs://Qm...",
        500_000_000, // 500 X402 stake
    ).await?;
    
    // Stream sensor data with micropayments
    loop {
        let data = read_sensor_data(); // e.g., temperature, humidity
        
        let payment_req = PaymentRequest::builder()
            .amount_usdc_cents(1)  // $0.01 per reading
            .metadata(serde_json::json!({ "reading": data }))
            .build()?;
        
        match client.await_payment(&payment_req, Duration::from_secs(2)).await {
            Ok(receipt) => {
                send_data_to_user(data).await?;
                client.confirm_service(&receipt.payment_id, proof).await?;
            }
            Err(e) => eprintln!("Payment failed: {}", e),
        }
        
        tokio::time::sleep(Duration::from_secs(10)).await;
    }
}`}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="javascript" className="mt-6 space-y-6">
              <Card className="border-gray-700/20 bg-gray-800/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-muted-foreground font-mono p-4 rounded-lg bg-black/50">
{`npm install @x402pay/sdk`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="border-gray-700/20 bg-gray-800/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Smart Parking Meter Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs text-muted-foreground font-mono overflow-x-auto p-4 rounded-lg bg-black/50">
{`import { BrainX402Client, Connection, Keypair } from '@x402pay/sdk';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const deviceKeypair = Keypair.fromSecretKey(
  Buffer.from(process.env.DEVICE_SECRET_KEY!, 'base64')
);

const client = new BrainX402Client(connection, deviceKeypair);

// Smart parking meter example
async function chargeParkingFee(userWallet: string, hours: number) {
  const ratePerHour = 2.50; // $2.50/hour USDC
  
  const payment = await client.createPaymentRequest({
    amountUsdc: ratePerHour * hours,
    userWallet,
    metadata: { 
      service: 'parking',
      duration: hours,
      location: 'Downtown Lot A'
    },
    expirySeconds: 300,
  });
  
  const receipt = await client.awaitPayment(payment, 3000); // 3 sec timeout
  
  if (receipt.confirmed) {
    console.log(\`✅ Parking paid: \${hours}h for $\${ratePerHour * hours}\`);
    // Raise parking gate via API call
    await fetch('https://parking-api.example.com/raise-gate', {
      method: 'POST',
      body: JSON.stringify({ spotId: 'A-24', duration: hours })
    });
  }
}`}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="space-y-8" data-testid="section-global-mesh">
          <h2 className="text-3xl font-bold text-foreground">Global Device Mesh</h2>
          <p className="text-lg text-muted-foreground">
            x402Pay includes a <strong className="text-foreground">decentralized relay network</strong> for devices without static IPs:
          </p>
          
          <Card className="border-gray-700/20 bg-gray-800/5">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">The Problem</h3>
                  <p className="text-muted-foreground">
                    Most IoT devices are behind NATs/firewalls, unreachable from the public internet.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-700/20 pt-4">
                <h3 className="font-semibold text-foreground mb-2">The Solution</h3>
                <p className="text-muted-foreground mb-3">
                  Devices connect to x402Pay relay nodes (similar to Helium's LoRaWAN architecture):
                </p>
                <pre className="text-sm text-muted-foreground font-mono p-4 rounded-lg bg-black/50">
{`User Wallet → x402 Sol Program → Relay Node → NAT Traversal → IoT Device`}
                </pre>
              </div>
              
              <div className="border-t border-gray-700/20 pt-4">
                <h3 className="font-semibold text-foreground mb-3">Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">Global Addressability</p>
                      <p className="text-xs text-muted-foreground">Devices accessible via DID regardless of location</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">Low Latency</p>
                      <p className="text-xs text-muted-foreground">150+ relay nodes worldwide (avg 50ms latency)</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">Censorship Resistance</p>
                      <p className="text-xs text-muted-foreground">No single entity controls relay network</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-300">•</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">Incentivized</p>
                      <p className="text-xs text-muted-foreground">Relay operators earn X402 fees (0.1% of transaction value)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-700/20 bg-gray-800/5">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">SDK Auto-Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground font-mono p-4 rounded-lg bg-black/50">
{`client = BrainX402Client(
    device_keypair=device_key,
    network="mainnet",
    relay_mode="auto",  # Automatically find nearest relay
)
# SDK handles NAT traversal transparently`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-between pt-8 border-t border-gray-700/10">
          <Link href="/device-identity">
            <Button variant="ghost" className="hover-elevate" data-testid="button-back">
              ← Back to Device Identity
            </Button>
          </Link>
          <Link href="/tokenomics">
            <Button variant="ghost" className="text-gray-300 hover-elevate" data-testid="button-next">
              Next: Tokenomics
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
