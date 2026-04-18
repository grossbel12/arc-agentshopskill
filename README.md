## AgentShop (MVP)

Marketplace for AI Skills/Sub-agents on **Arc Testnet**. Users connect a wallet, pay with **testnet USDC**, and after purchase see the skill **install command** + **JSON config**.

### Prerequisites
- **WalletConnect Project ID** (for RainbowKit): set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- Arc Testnet wallet funded with **testnet USDC** (Circle faucet)

### Environment
Copy `.env.example` to `.env.local` and fill in values:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
NEXT_PUBLIC_ARC_CHAIN_ID=1516
NEXT_PUBLIC_SKILL_SHOP_ADDRESS=0x...
NEXT_PUBLIC_USDC_ADDRESS=0x...

ARC_RPC_URL=https://rpc.testnet.arc.network
DEPLOYER_PRIVATE_KEY=...
ARC_USDC_ADDRESS=0x...
```

### Run the app
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Smart contract (Hardhat)
Compile:
```bash
npm run hardhat:compile
```

Deploy to Arc Testnet:
```bash
npm run hardhat:deploy:arcTestnet
```

After deploy, set the deployed address into `NEXT_PUBLIC_SKILL_SHOP_ADDRESS` in `.env.local`.

### Deploy to Vercel
- Add the same `NEXT_PUBLIC_*` environment variables in Vercel Project Settings.
- Deploy the Next.js app normally (`vercel deploy` or via Git integration).

### Notes
- Purchases are tracked on-chain in `SkillShop.hasPurchased(buyer, skillId)`.
- Skill metadata is static in `data/skills.ts`.

### Links
- ArcScan (testnet explorer): `https://testnet.arcscan.app`
- Circle faucet (testnet USDC): `https://faucet.circle.com`

