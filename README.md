# Shielded Harvest Protocol

A privacy-preserving DeFi yield farming protocol built with Fully Homomorphic Encryption (FHE) technology. Protect your farming strategies while maximizing returns through confidential algorithmic strategies.

## 🌟 Features

- **Private Farming Strategies**: Your yield farming strategies remain encrypted and invisible to competitors
- **FHE-Protected Data**: Core financial data is encrypted using Fully Homomorphic Encryption
- **Secure Protocols**: Audited smart contracts with zero-knowledge proof integration
- **Maximum Yields**: Optimized returns through confidential algorithmic strategies
- **Multi-Wallet Support**: Connect with Rainbow, MetaMask, and other popular wallets

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/0x-Krypton/shielded-harvest-protocol.git

# Navigate to the project directory
cd shielded-harvest-protocol

# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Start the development server
npm run dev
```

### Environment Configuration

Create a `.env` file with the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **RainbowKit** for wallet connection
- **Wagmi** for Ethereum interactions

### Smart Contracts
- **Solidity 0.8.24** with FHE support
- **Zama FHEVM** for homomorphic encryption
- **Sepolia Testnet** deployment ready

### Key Components
- `ShieldedHarvest.sol`: Main contract with FHE-protected yield farming
- `WalletConnect.tsx`: Wallet connection component
- `Hero.tsx`: Landing page with wallet integration

## 🔒 Security Features

- **Fully Homomorphic Encryption**: All sensitive data encrypted on-chain
- **Zero-Knowledge Proofs**: Verify transactions without revealing details
- **Multi-signature Support**: Enhanced security for large operations
- **Audit-Ready**: Clean, documented code for security audits

## 📱 Usage

1. **Connect Wallet**: Use the wallet connect button to link your Ethereum wallet
2. **Create Pool**: Deploy a new yield farming pool with your strategy
3. **Stake Assets**: Deposit liquidity into encrypted pools
4. **Earn Rewards**: Receive yield while keeping strategies private
5. **Withdraw**: Claim rewards and withdraw when ready

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure

```
src/
├── components/      # React components
├── lib/            # Utility functions and configurations
├── pages/          # Page components
└── App.tsx         # Main application component

contracts/
└── ShieldedHarvest.sol  # Main smart contract
```

## 🌐 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **Discord**: [Coming Soon]
- **Twitter**: [Coming Soon]

## ⚠️ Disclaimer

This is experimental software. Use at your own risk. Always conduct thorough testing before using with real funds.
