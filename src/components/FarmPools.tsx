import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Lock, Unlock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import DepositDialog from "@/components/DepositDialog";

const pools = [
  {
    id: 1,
    name: "ETH-USDC Stealth Pool",
    tvl: "$2.4M",
    apy: "127.5%",
    strategy: "●●●●●●●●●●",
    isEncrypted: true,
    risk: "Medium",
    rewards: ["FARM", "ETH"],
  },
  {
    id: 2,
    name: "BTC-USDT Shadow Farm",
    tvl: "$1.8M",
    apy: "89.2%",
    strategy: "●●●●●●●●●●",
    isEncrypted: true,
    risk: "Low",
    rewards: ["FARM", "BTC"],
  },
  {
    id: 3,
    name: "AVAX-USDC Phantom Pool",
    tvl: "$950K",
    apy: "156.8%",
    strategy: "●●●●●●●●●●",
    isEncrypted: true,
    risk: "High",
    rewards: ["FARM", "AVAX"],
  },
  {
    id: 4,
    name: "MATIC-USDC Ghost Farm",
    tvl: "$1.2M",
    apy: "98.4%",
    strategy: "●●●●●●●●●●",
    isEncrypted: true,
    risk: "Medium",
    rewards: ["FARM", "MATIC"],
  },
];

const FarmPools = () => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-primary";
      case "Medium": return "text-reward-gold";
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const [depositOpen, setDepositOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 glow-text">Active Farm Pools</h2>
          <p className="text-xl text-muted-foreground">
            Confidential yield strategies with encrypted farming protocols
          </p>
        </div>

        <div className="grid gap-6">
          {pools.map((pool) => (
            <Card key={pool.id} className="glow-card p-6 hover:scale-102 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{pool.name}</h3>
                    {pool.isEncrypted ? (
                      <Lock className="h-5 w-5 text-accent" />
                    ) : (
                      <Unlock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">TVL:</span>
                      <span className="font-semibold text-primary">{pool.tvl}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-secondary" />
                      <span className="font-bold text-secondary text-lg">{pool.apy}</span>
                      <span className="text-sm text-muted-foreground">APY</span>
                    </div>
                    <Badge variant="outline" className={getRiskColor(pool.risk)}>
                      {pool.risk} Risk
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <span className="text-sm text-muted-foreground block">Strategy:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-glow-green">{pool.strategy}</span>
                        <EyeOff className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">Rewards:</span>
                    {pool.rewards.map((reward, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {reward}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:min-w-48">
                  <Button className="w-full glow-border" onClick={() => { setSelectedPool(pool.name); setDepositOpen(true); }}>
                    Deposit
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/pools">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/pools">View All Pools</Link>
          </Button>
        </div>
        </div>
        <DepositDialog open={depositOpen} onOpenChange={setDepositOpen} poolName={selectedPool ?? undefined} />
      </section>
  );
};

export default FarmPools;