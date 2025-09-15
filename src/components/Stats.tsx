import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Lock, Zap } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: TrendingUp,
      label: "Total Value Locked",
      value: "$127.3M",
      change: "+12.4%",
      color: "text-primary",
    },
    {
      icon: Users,
      label: "Active Farmers",
      value: "8,342",
      change: "+5.8%",
      color: "text-secondary",
    },
    {
      icon: Lock,
      label: "Encrypted Pools",
      value: "24",
      change: "+3",
      color: "text-accent",
    },
    {
      icon: Zap,
      label: "Avg APY",
      value: "118.7%",
      change: "+8.2%",
      color: "text-reward-gold",
    },
  ];

  return (
    <section className="py-16 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glow-card p-6 text-center group hover:scale-105 transition-transform">
              <div className="mb-4">
                <stat.icon className={`h-8 w-8 mx-auto ${stat.color}`} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-sm ${stat.color}`}>{stat.change}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;