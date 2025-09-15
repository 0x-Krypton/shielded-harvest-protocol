# Vercel Deployment Guide for Shielded Harvest Protocol

This guide provides step-by-step instructions for deploying the Shielded Harvest Protocol to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Environment variables ready

## Step-by-Step Deployment

### 1. Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### 2. Import GitHub Repository

1. In the "Import Git Repository" section, find `0x-Krypton/shielded-harvest-protocol`
2. Click "Import" next to the repository
3. Vercel will automatically detect it's a Vite project

### 3. Configure Project Settings

1. **Project Name**: `shielded-harvest-protocol`
2. **Framework Preset**: Vite (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default)
6. **Install Command**: `npm install` (default)

### 4. Environment Variables Configuration

Click "Environment Variables" and add the following:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**Important**: Make sure to set these for all environments (Production, Preview, Development)

### 5. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Vercel will provide you with a deployment URL

### 6. Custom Domain (Optional)

1. Go to your project dashboard
2. Click "Settings" tab
3. Navigate to "Domains"
4. Add your custom domain
5. Follow DNS configuration instructions

## Post-Deployment Configuration

### 1. Verify Deployment

1. Visit your deployment URL
2. Test wallet connection functionality
3. Verify all pages load correctly
4. Check console for any errors

### 2. Update Smart Contract Addresses

Once you deploy the smart contracts to Sepolia:

1. Go to Vercel dashboard
2. Navigate to Environment Variables
3. Add: `NEXT_PUBLIC_CONTRACT_ADDRESS=0x...` (your deployed contract address)
4. Redeploy the application

### 3. Enable Analytics (Optional)

1. In Vercel dashboard, go to "Analytics" tab
2. Enable Web Analytics for traffic insights

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check if all dependencies are in package.json
   - Verify Node.js version compatibility
   - Check build logs in Vercel dashboard

2. **Environment Variables Not Working**
   - Ensure variables are prefixed with `NEXT_PUBLIC_`
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches your configuration

### Build Optimization

1. **Enable Edge Functions** (if needed)
2. **Configure Caching** for static assets
3. **Enable Compression** for better performance

## Monitoring and Maintenance

### 1. Performance Monitoring

- Use Vercel Analytics to monitor performance
- Set up alerts for build failures
- Monitor Core Web Vitals

### 2. Regular Updates

- Keep dependencies updated
- Monitor for security vulnerabilities
- Update smart contract addresses when needed

### 3. Backup Strategy

- Repository is automatically backed up on GitHub
- Vercel provides automatic deployments from main branch
- Consider database backups if using external services

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Regularly rotate API keys

2. **Smart Contract Security**
   - Deploy to testnet first
   - Conduct thorough testing
   - Consider professional audits

3. **Access Control**
   - Limit Vercel team access
   - Use proper GitHub permissions
   - Monitor deployment logs

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)

## Deployment Checklist

- [ ] Repository imported to Vercel
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] Wallet connection tested
- [ ] All pages accessible
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled (if desired)
- [ ] Monitoring set up

## Next Steps

After successful deployment:

1. Share the live URL with your team
2. Set up monitoring and alerts
3. Plan for smart contract deployment
4. Consider implementing CI/CD workflows
5. Prepare for mainnet deployment

---

**Note**: This deployment guide assumes you have already completed the smart contract development and testing phases. Make sure to thoroughly test your application before deploying to production.
