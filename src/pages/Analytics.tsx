import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Eye } from "lucide-react";

const analyticsData = [
  {
    title: "Protocol TVL",
    value: "$12.4M",
    change: "+15.2%",
    trend: "up",
    icon: BarChart3,
  },
  {
    title: "24h Volume",
    value: "$2.1M",
    change: "+8.7%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Active Strategies",
    value: "47",
    change: "+12",
    trend: "up",
    icon: PieChart,
  },
  {
    title: "Avg. Pool APY",
    value: "89.3%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
  },
];

const topStrategies = [
  { name: "Encrypted Arbitrage", performance: "+34.2%", risk: "Medium", allocation: "23%" },
  { name: "Shadow Liquidity Mining", performance: "+28.9%", risk: "Low", allocation: "31%" },
  { name: "Phantom Yield Aggregation", performance: "+45.1%", risk: "High", allocation: "18%" },
  { name: "Stealth Flash Loans", performance: "+22.7%", risk: "Medium", allocation: "28%" },
];

const recentActivity = [
  { action: "New pool created", pool: "ETH-USDC Stealth", time: "2 hours ago" },
  { action: "Strategy encrypted", pool: "BTC-USDT Shadow", time: "4 hours ago" },
  { action: "Rewards distributed", pool: "AVAX-USDC Phantom", time: "6 hours ago" },
  { action: "Pool rebalanced", pool: "MATIC-USDC Ghost", time: "8 hours ago" },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 glow-text">Analytics Dashboard</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep insights into protocol performance, strategy analytics, and encrypted farming metrics
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {analyticsData.map((metric, index) => (
                <Card key={index} className="glow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className="h-8 w-8 text-primary" />
                    <div className="flex items-center gap-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-glow-green" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <Badge 
                        variant="secondary" 
                        className={metric.trend === "up" ? "text-glow-green" : "text-destructive"}
                      >
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{metric.value}</h3>
                  <p className="text-muted-foreground">{metric.title}</p>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Strategies */}
              <Card className="glow-card p-6">
                <h2 className="text-2xl font-bold mb-6 glow-text flex items-center gap-2">
                  <Eye className="h-6 w-6" />
                  Top Encrypted Strategies
                </h2>
                <div className="space-y-4">
                  {topStrategies.map((strategy, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50">
                      <div>
                        <h3 className="font-semibold mb-1">{strategy.name}</h3>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-glow-green">
                            {strategy.performance}
                          </Badge>
                          <Badge variant="secondary">
                            {strategy.risk} Risk
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{strategy.allocation}</p>
                        <p className="text-sm text-muted-foreground">Allocation</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="glow-card p-6">
                <h2 className="text-2xl font-bold mb-6 glow-text flex items-center gap-2">
                  <Activity className="h-6 w-6" />
                  Recent Protocol Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50">
                      <div>
                        <h3 className="font-semibold text-primary">{activity.action}</h3>
                        <p className="text-muted-foreground">{activity.pool}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Analytics;