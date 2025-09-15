import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Shield, Leaf } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
          <div className="relative">
            <Leaf className="h-8 w-8 text-primary animate-glow-pulse" />
            <div className="absolute inset-0 animate-float">
              <Leaf className="h-8 w-8 text-glow-green/30" />
            </div>
          </div>
          <span className="text-xl font-bold glow-text">PrivateFarm</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/farm" 
            className={`transition-colors ${isActive('/farm') ? 'text-primary glow-text' : 'text-muted-foreground hover:text-primary'}`}
          >
            Farm
          </Link>
          <Link 
            to="/pools" 
            className={`transition-colors ${isActive('/pools') ? 'text-primary glow-text' : 'text-muted-foreground hover:text-primary'}`}
          >
            Pools
          </Link>
          <Link 
            to="/analytics" 
            className={`transition-colors ${isActive('/analytics') ? 'text-primary glow-text' : 'text-muted-foreground hover:text-primary'}`}
          >
            Analytics
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Card className="px-3 py-2 bg-card/50 border-primary/20">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">Encrypted</span>
            </div>
          </Card>
          
          <Button variant="outline" className="glow-border">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;