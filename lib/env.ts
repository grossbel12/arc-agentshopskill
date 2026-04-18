function normalize(value: string | undefined): string | undefined {
  return value && value.length > 0 ? value : undefined;
}

// Next.js only exposes NEXT_PUBLIC_* reliably with direct property access.
const walletConnectProjectId = normalize(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID);
const arcChainIdRaw = normalize(process.env.NEXT_PUBLIC_ARC_CHAIN_ID);
const arcRpcUrl = normalize(process.env.NEXT_PUBLIC_ARC_RPC_URL);
const skillShopAddress = normalize(process.env.NEXT_PUBLIC_SKILL_SHOP_ADDRESS);
const usdcAddress = normalize(process.env.NEXT_PUBLIC_USDC_ADDRESS);

export const env = {
  walletConnectProjectId,
  arcChainId: Number(arcChainIdRaw ?? "5042002"),
  arcRpcUrl,
  skillShopAddress,
  usdcAddress,
} as const;

export const isAppConfigured =
  Boolean(env.skillShopAddress) &&
  Boolean(env.usdcAddress);
