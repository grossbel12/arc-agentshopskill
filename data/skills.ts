import type { Skill } from "@/types";

export const SKILLS: readonly Skill[] = [
  {
    id: 1,
    name: "USDC Bridge Agent",
    description: "Bridges testnet USDC to and from Arc with clear route, retry, and status steps.",
    longDescription:
      "An Arc-focused skill for moving testnet USDC between Arc, Ethereum, Base, and Arbitrum using Circle flows. It should explain the bridge route, ask for source and destination chains, confirm amount and wallet, then execute with retry-aware status updates.",
    price: 0.1,
    priceWei: 100_000n,
    category: "DeFi",
    tags: ["bridge", "USDC", "CCTP", "crosschain"],
    installCommand: "claude skill add circlefin/skills/bridge-stablecoin",
    configJson: {
      name: "usdc-bridge-agent",
      version: "1.0.0",
      skill: "bridge-stablecoin",
      prompt:
        "You are an Arc USDC bridge operator. Help the user bridge testnet USDC between Arc and supported chains. Always confirm source chain, destination chain, amount, receiving wallet, expected bridge method, fees, and final status. Prefer safe defaults, clear confirmations, and step-by-step transaction updates.",
      config: { defaultSlippage: 0.5, maxRetries: 3, preferredNetwork: "arc-testnet" },
    },
    githubUrl: "https://github.com/circlefin/skills/tree/main/skills/bridge-stablecoin",
    author: "CircleFin",
    rating: 4.8,
    downloads: 1240,
  },
  {
    id: 2,
    name: "Smart Contract Deployer",
    description: "Deploys, verifies, and summarizes smart contracts for Arc Testnet.",
    longDescription:
      "An Arc-native deployment skill for ERC-20, ERC-721, and ERC-1155 contracts. It should prepare constructor args, compile, deploy to Arc Testnet, verify on ArcScan when possible, and return addresses, ABI artifacts, and next interaction commands.",
    price: 0.1,
    priceWei: 100_000n,
    category: "Developer Tools",
    tags: ["deploy", "contracts", "ERC-20", "Arc", "Foundry"],
    installCommand: "claude skill add circlefin/skills/use-arc",
    configJson: {
      name: "contract-deployer",
      version: "1.0.0",
      skill: "use-arc",
      prompt:
        "You are an Arc smart contract deployment specialist. Deploy contracts to Arc Testnet, verify them when possible, and return a concise deployment summary with contract address, network, constructor args, and next commands for approve, mint, transfer, or ownership actions.",
      config: { network: "arc-testnet", verify: true, includeDeploymentSummary: true },
    },
    githubUrl: "https://github.com/circlefin/skills/tree/main/skills/use-arc",
    author: "CircleFin",
    rating: 4.9,
    downloads: 873,
  },
  {
    id: 3,
    name: "Wallet Manager Agent",
    description: "Creates, checks, and operates Circle wallets with Arc-focused transfer guidance.",
    longDescription:
      "A wallet operations skill for Circle developer-controlled and user-controlled wallets. It should help create wallets, inspect balances, prepare Arc transfers, monitor wallet activity, and explain each step in plain language.",
    price: 0.1,
    priceWei: 100_000n,
    category: "Wallets",
    tags: ["wallets", "Circle", "custody", "transfers"],
    installCommand: "claude skill add circlefin/skills/use-circle-wallets",
    configJson: {
      name: "wallet-manager",
      version: "1.0.0",
      skill: "use-circle-wallets",
      prompt:
        "You are a Circle wallet operations agent for Arc users. Help create wallets, inspect balances, prepare transfers, and summarize transaction history. Be explicit about wallet type, chain, token, recipient, and confirmations before any transfer action.",
      config: { walletType: "developer-controlled", monitoring: true, preferredNetwork: "arc-testnet" },
    },
    githubUrl: "https://github.com/circlefin/skills/tree/main/skills/use-circle-wallets",
    author: "CircleFin",
    rating: 4.7,
    downloads: 654,
  },
  {
    id: 4,
    name: "DeFi Portfolio Agent",
    description: "Tracks and manages an Arc-first DeFi portfolio with actionable next steps.",
    longDescription:
      "A portfolio skill built around Arc Testnet usage. It should review holdings, explain allocation, suggest rebalance moves, coordinate bridge or swap steps when needed, and produce a clean action plan with risks and expected outcomes.",
    price: 0.1,
    priceWei: 100_000n,
    category: "Portfolio",
    tags: ["portfolio", "DeFi", "rebalance", "gateway", "all-in-one"],
    installCommand:
      "claude skill add circlefin/skills/use-gateway && claude skill add circlefin/skills/bridge-stablecoin",
    configJson: {
      name: "defi-portfolio-agent",
      version: "1.0.0",
      skills: ["use-gateway", "bridge-stablecoin", "use-arc"],
      prompt:
        "You are an Arc DeFi portfolio manager. Review balances, explain current allocation, identify concentration risk, and suggest a step-by-step rebalance or bridge plan. Keep recommendations practical, explicit, and easy to execute on Arc Testnet.",
      config: { autoRebalance: false, alertThreshold: 5, preferredNetwork: "arc-testnet" },
    },
    githubUrl: "https://github.com/circlefin/skills",
    author: "CircleFin",
    rating: 4.6,
    downloads: 312,
  },
] as const;
