import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShieldedHarvest } from "@/hooks/useContract";
import { TransactionStatus } from "@/components/TransactionStatus";
import { Loader2, TrendingUp, Clock, DollarSign } from "lucide-react";
import { formatEther } from "viem";

const UserStakes: React.FC = () => {
  const { 
    isConnected, 
    address, 
    stakeInfo, 
    userReputation,
    claimRewards, 
    unstake,
    isPending,
    isConfirming,
    transactionStatus,
    clearTransactionStatus 
  } = useShieldedHarvest();

  const [actionLoading, setActionLoading] = useState<{
    type: 'claim' | 'unstake' | null;
    stakeId: number | null;
  }>({ type: null, stakeId: null });

  const handleClaimRewards = async (stakeId: number) => {
    setActionLoading({ type: 'claim', stakeId });
    try {
      await claimRewards(stakeId);
    } catch (error) {
      console.error("Failed to claim rewards:", error);
    } finally {
      setActionLoading({ type: null, stakeId: null });
    }
  };

  const handleUnstake = async (stakeId: number) => {
    setActionLoading({ type: 'unstake', stakeId });
    try {
      await unstake(stakeId);
    } catch (error) {
      console.error("Failed to unstake:", error);
    } finally {
      setActionLoading({ type: null, stakeId: null });
    }
  };

  if (!isConnected) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Connect your wallet to view your stakes</p>
      </Card>
    );
  }

  // Mock data for demonstration - in real app, this would come from contract
  const mockStakes = [
    {
      id: 1,
      poolName: "ETH-USDC Stealth Pool",
      amount: "1.5",
      token: "ETH",
      rewards: "0.25",
      timestamp: Date.now() - 86400000, // 1 day ago
      apy: "127.5%"
    },
    {
      id: 2,
      poolName: "BTC-USDT Shadow Farm",
      amount: "0.8",
      token: "BTC",
      rewards: "0.15",
      timestamp: Date.now() - 172800000, // 2 days ago
      apy: "89.2%"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold glow-text">Your Stakes</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-accent">
            Reputation: {userReputation || "0"}
          </Badge>
        </div>
      </div>

      <TransactionStatus
        type={transactionStatus.type}
        message={transactionStatus.message}
        onClear={clearTransactionStatus}
      />

      {mockStakes.length === 0 ? (
        <Card className="p-8 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Active Stakes</h3>
          <p className="text-muted-foreground mb-4">
            Start farming by depositing into one of our pools
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {mockStakes.map((stake) => (
            <Card key={stake.id} className="p-6 glow-card">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold">{stake.poolName}</h3>
                    <Badge variant="secondary">{stake.apy} APY</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Staked Amount</p>
                      <p className="font-semibold">{stake.amount} {stake.token}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Rewards</p>
                      <p className="font-semibold text-secondary">{stake.rewards} {stake.token}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Staked Since</p>
                      <p className="font-semibold">
                        {new Date(stake.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="outline" className="text-primary">Active</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:min-w-48">
                  <Button
                    className="w-full glow-border"
                    onClick={() => handleClaimRewards(stake.id)}
                    disabled={isPending || isConfirming || actionLoading.type === 'claim'}
                  >
                    {actionLoading.type === 'claim' && actionLoading.stakeId === stake.id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Claiming...
                      </>
                    ) : (
                      <>
                        <DollarSign className="h-4 w-4 mr-2" />
                        Claim Rewards
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleUnstake(stake.id)}
                    disabled={isPending || isConfirming || actionLoading.type === 'unstake'}
                  >
                    {actionLoading.type === 'unstake' && actionLoading.stakeId === stake.id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Unstaking...
                      </>
                    ) : (
                      "Unstake"
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-6 bg-card/50 border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold">Transaction History</h3>
        </div>
        <p className="text-muted-foreground text-sm">
          View your complete transaction history on the blockchain explorer
        </p>
        <Button variant="outline" size="sm" className="mt-3">
          View on Explorer
        </Button>
      </Card>
    </div>
  );
};

export default UserStakes;
