import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { SHIELDED_HARVEST_CONTRACT_ADDRESS, SHIELDED_HARVEST_CONTRACT_ABI } from '@/lib/contracts';
import { useState, useEffect } from 'react';

export interface PoolInfo {
  name: string;
  description: string;
  totalStakedAmount: string;
  totalRewardsDistributed: string;
  stakerCount: string;
  isActive: boolean;
  owner: string;
  startTime: string;
  endTime: string;
}

export interface StakeInfo {
  amount: string;
  staker: string;
  timestamp: string;
  rewardsClaimed: string;
}

export const useShieldedHarvest = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [transactionStatus, setTransactionStatus] = useState<{
    type: 'idle' | 'pending' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  // Read pool information
  const { data: poolInfo, refetch: refetchPoolInfo } = useReadContract({
    address: SHIELDED_HARVEST_CONTRACT_ADDRESS,
    abi: SHIELDED_HARVEST_CONTRACT_ABI,
    functionName: 'getPoolInfo',
    args: [0], // Default to pool 0, can be made dynamic
  });

  // Read stake information for user
  const { data: stakeInfo, refetch: refetchStakeInfo } = useReadContract({
    address: SHIELDED_HARVEST_CONTRACT_ADDRESS,
    abi: SHIELDED_HARVEST_CONTRACT_ABI,
    functionName: 'getStakeInfo',
    args: [0], // Default to stake 0, can be made dynamic
  });

  // Read user reputation
  const { data: userReputation, refetch: refetchReputation } = useReadContract({
    address: SHIELDED_HARVEST_CONTRACT_ADDRESS,
    abi: SHIELDED_HARVEST_CONTRACT_ABI,
    functionName: 'getStakerReputation',
    args: address ? [address] : undefined,
  });

  // Create a new pool
  const createPool = async (name: string, description: string, duration: number) => {
    if (!isConnected) {
      setTransactionStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    try {
      setTransactionStatus({ type: 'pending', message: 'Creating pool...' });
      
      await writeContract({
        address: SHIELDED_HARVEST_CONTRACT_ADDRESS,
        abi: SHIELDED_HARVEST_CONTRACT_ABI,
        functionName: 'createPool',
        args: [name, description, duration],
      });
    } catch (err) {
      setTransactionStatus({ 
        type: 'error', 
        message: `Failed to create pool: ${err instanceof Error ? err.message : 'Unknown error'}` 
      });
    }
  };

  // Stake tokens (simplified version without FHE for now)
  const stake = async (poolId: number, amount: string) => {
    if (!isConnected) {
      setTransactionStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    try {
      setTransactionStatus({ type: 'pending', message: 'Staking tokens...' });
      
      const amountWei = parseEther(amount);
      
      // For now, we'll use a simplified stake function
      // In a real FHE implementation, this would involve encrypted amounts
      await writeContract({
        address: SHIELDED_HARVEST_CONTRACT_ADDRESS,
        abi: SHIELDED_HARVEST_CONTRACT_ABI,
        functionName: 'stake',
        args: [poolId, amountWei, '0x'], // Simplified without FHE proof
        value: amountWei,
      });
    } catch (err) {
      setTransactionStatus({ 
        type: 'error', 
        message: `Failed to stake: ${err instanceof Error ? err.message : 'Unknown error'}` 
      });
    }
  };

  // Claim rewards
  const claimRewards = async (stakeId: number) => {
    if (!isConnected) {
      setTransactionStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    try {
      setTransactionStatus({ type: 'pending', message: 'Claiming rewards...' });
      
      await writeContract({
        address: SHIELDED_HARVEST_CONTRACT_ADDRESS,
        abi: SHIELDED_HARVEST_CONTRACT_ABI,
        functionName: 'claimRewards',
        args: [stakeId],
      });
    } catch (err) {
      setTransactionStatus({ 
        type: 'error', 
        message: `Failed to claim rewards: ${err instanceof Error ? err.message : 'Unknown error'}` 
      });
    }
  };

  // Unstake tokens
  const unstake = async (stakeId: number) => {
    if (!isConnected) {
      setTransactionStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    try {
      setTransactionStatus({ type: 'pending', message: 'Unstaking tokens...' });
      
      await writeContract({
        address: SHIELDED_HARVEST_CONTRACT_ADDRESS,
        abi: SHIELDED_HARVEST_CONTRACT_ABI,
        functionName: 'unstake',
        args: [stakeId],
      });
    } catch (err) {
      setTransactionStatus({ 
        type: 'error', 
        message: `Failed to unstake: ${err instanceof Error ? err.message : 'Unknown error'}` 
      });
    }
  };

  // Update transaction status based on confirmation
  useEffect(() => {
    if (isConfirmed) {
      setTransactionStatus({ type: 'success', message: 'Transaction confirmed!' });
      // Refetch data after successful transaction
      refetchPoolInfo();
      refetchStakeInfo();
      refetchReputation();
    }
  }, [isConfirmed, refetchPoolInfo, refetchStakeInfo, refetchReputation]);

  return {
    // State
    isConnected,
    address,
    isPending,
    isConfirming,
    isConfirmed,
    transactionStatus,
    
    // Data
    poolInfo: poolInfo as PoolInfo | undefined,
    stakeInfo: stakeInfo as StakeInfo | undefined,
    userReputation: userReputation as string | undefined,
    
    // Actions
    createPool,
    stake,
    claimRewards,
    unstake,
    
    // Utilities
    refetchPoolInfo,
    refetchStakeInfo,
    refetchReputation,
    clearTransactionStatus: () => setTransactionStatus({ type: 'idle', message: '' }),
  };
};
