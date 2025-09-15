import { sepolia } from 'wagmi/chains';

export const CONTRACT_ADDRESSES = {
  [sepolia.id]: {
    ShieldedHarvest: '0x0000000000000000000000000000000000000000', // Will be deployed
  },
} as const;

export const SUPPORTED_CHAINS = [sepolia] as const;
