import { useAccount, useReadContract } from "wagmi";
import { arcTestnet } from "@/lib/arc-chain";
import { SKILL_SHOP_ABI, SKILL_SHOP_ADDRESS } from "@/lib/contract";

export function useHasPurchased(skillId: 1 | 2 | 3 | 4) {
  const { address, chainId, isConnected } = useAccount();
  const isOnArc = chainId === arcTestnet.id;
  const canReadPurchase = Boolean(isConnected && address && isOnArc);

  const result = useReadContract({
    address: SKILL_SHOP_ADDRESS,
    abi: SKILL_SHOP_ABI,
    functionName: "checkPurchase",
    chainId: arcTestnet.id,
    args: canReadPurchase && address ? [address, BigInt(skillId)] : undefined,
    query: {
      enabled: canReadPurchase,
      retry: 1,
      staleTime: 15_000,
      refetchOnWindowFocus: false,
    },
  });

  return {
    hasPurchased: Boolean(result.data),
    isLoading: canReadPurchase && result.isLoading,
    isError: result.isError,
    error: result.error,
    canReadPurchase,
    isOnArc,
    refetch: result.refetch,
  } as const;
}
