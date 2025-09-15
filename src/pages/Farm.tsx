import Header from "@/components/Header";
import FarmPools from "@/components/FarmPools";
import UserStakes from "@/components/UserStakes";
import { WalletConnect } from "@/components/WalletConnect";
import { useShieldedHarvest } from "@/hooks/useContract";
import { TransactionStatus } from "@/components/TransactionStatus";

const Farm = () => {
  const { isConnected, transactionStatus, clearTransactionStatus } = useShieldedHarvest();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-20 pb-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 glow-text">Private Farming</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Stake your assets in encrypted farming strategies while keeping your competitive edge protected
            </p>
            
            {/* Wallet Connection */}
            <div className="mb-8">
              <WalletConnect />
            </div>

            {/* Transaction Status */}
            <TransactionStatus
              type={transactionStatus.type}
              message={transactionStatus.message}
              onClear={clearTransactionStatus}
            />

            {!isConnected && (
              <div className="bg-card/50 border border-primary/20 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-muted-foreground">
                  Connect your wallet to start private farming
                </p>
              </div>
            )}
          </div>
        </section>
        
        {isConnected && (
          <div className="container mx-auto px-4 space-y-12">
            <FarmPools />
            <UserStakes />
          </div>
        )}
      </main>
    </div>
  );
};

export default Farm;