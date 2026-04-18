import { defineChain } from "viem";
import { env } from "./env";

const DEFAULT_RPC_URLS = [
  "https://rpc.testnet.arc.network",
  "https://arc-testnet.drpc.org",
  "https://rpc.blockdaemon.testnet.arc.network",
  "https://rpc.quicknode.testnet.arc.network",
] as const;

export const RPC_URLS = [
  env.arcRpcUrl,
  ...DEFAULT_RPC_URLS,
].filter((value, index, array): value is string => {
  return Boolean(value) && array.indexOf(value) === index;
});

export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: {
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
  },
  rpcUrls: {
    default: {
      http: RPC_URLS,
    },
  },
  blockExplorers: {
    default: { name: "ArcScan", url: "https://testnet.arcscan.app" },
  },
  testnet: true,
});
