import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import DepositDialog from "@/components/DepositDialog";
import { useState } from "react";

const poolStats = [
  {
    title: "Total Value Locked",
    value: "$12.4M",
    change: "+15.2%",
    icon: DollarSign,
  },
  {
    title: "Active Pools",
    value: "24",
    change: "+3",
    icon: Activity,
  },
  {
    title: "Total Farmers",
    value: "1,847",
    change: "+127",
    icon: Users,
  },
  {
    title: "Average APY",
    value: "89.3%",
    change: "+4.1%",
    icon: TrendingUp,
  },
];

const topPools = [
  { name: "ETH-USDC Stealth", tvl: "$2.4M", apy: "127.5%", farmers: 234 },
  { name: "BTC-USDT Shadow", tvl: "$1.8M", apy: "89.2%", farmers: 189 },
  { name: "AVAX-USDC Phantom", tvl: "$950K", apy: "156.8%", farmers: 167 },
  { name: "MATIC-USDC Ghost", tvl: "$1.2M", apy: "98.4%", farmers: 145 },
];

const Pools = () => {
  const [depositOpen, setDepositOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 glow-text">Pool Overview</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore all available farming pools with real-time statistics and performance metrics
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {poolStats.map((stat, index) => (
                <Card key={index} className="glow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="text-glow-green">
                      {stat.change}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.title}</p>
                </Card>
              ))}
            </div>

            <Card className="glow-card p-6">
              <h2 className="text-2xl font-bold mb-6 glow-text">Top Performing Pools</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground">Pool Name</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">TVL</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">APY</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Farmers</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPools.map((pool, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 font-semibold">{pool.name}</td>
                        <td className="py-4 px-4 text-primary">{pool.tvl}</td>
                        <td className="py-4 px-4 text-secondary font-bold">{pool.apy}</td>
                        <td className="py-4 px-4 text-muted-foreground">{pool.farmers}</td>
                        <td className="py-4 px-4">
                          <Button size="sm" className="glow-border" onClick={() => { setSelectedPool(pool.name); setDepositOpen(true); }}>
                            Farm Now
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>
        <DepositDialog open={depositOpen} onOpenChange={setDepositOpen} poolName={selectedPool ?? undefined} />
      </main>
    </div>
  );
};

export default Pools;