import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Eye, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletConnect } from "./WalletConnect";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center farm-bg overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-glow-green/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 bg-glow-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-glow-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text">
            Farm Privately,
            <br />
            <span className="text-secondary">Earn Securely</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Deposit liquidity into encrypted yield strategies. Your competitive edge stays protected 
            while you earn maximum rewards from confidential farming protocols.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="lg" className="text-lg px-8 py-6 glow-border animate-glow-pulse">
            <Link to="/pools">
              <Zap className="h-5 w-5 mr-2" />
              Start Farming
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            <Shield className="h-5 w-5 mr-2" />
            Learn More
          </Button>
        </div>

        {/* Wallet Connection */}
        <div className="mb-8">
          <WalletConnect />
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="glow-card p-6 text-center group hover:scale-105 transition-transform">
            <div className="mb-4">
              <Eye className="h-12 w-12 mx-auto text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Private Strategies</h3>
            <p className="text-muted-foreground">
              Your farming strategies remain encrypted and invisible to competitors
            </p>
          </Card>

          <Card className="glow-card p-6 text-center group hover:scale-105 transition-transform">
            <div className="mb-4">
              <Shield className="h-12 w-12 mx-auto text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Protocols</h3>
            <p className="text-muted-foreground">
              Audited smart contracts with zero-knowledge proof integration
            </p>
          </Card>

          <Card className="glow-card p-6 text-center group hover:scale-105 transition-transform">
            <div className="mb-4">
              <TrendingUp className="h-12 w-12 mx-auto text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Maximum Yields</h3>
            <p className="text-muted-foreground">
              Optimized returns through confidential algorithmic strategies
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;