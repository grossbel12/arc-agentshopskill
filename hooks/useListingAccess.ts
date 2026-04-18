import { useAccount, useReadContract } from "wagmi";
import { arcTestnet } from "@/lib/arc-chain";
import { SKILL_SHOP_ABI, SKILL_SHOP_ADDRESS } from "@/lib/contract";

export function useListingAccess() {
  const { address, chainId, isConnected } = useAccount();
  const isOnArc = chainId === arcTestnet.id;
  const enabled = Boolean(isConnected && address && isOnArc);

  const feeResult = useReadContract({
    address: SKILL_SHOP_ADDRESS,
    abi: SKILL_SHOP_ABI,
    functionName: "listingFee",
    chainId: arcTestnet.id,
    query: {
      retry: 1,
      staleTime: 15_000,
      refetchOnWindowFocus: false,
    },
  });

  const accessResult = useReadContract({
    address: SKILL_SHOP_ADDRESS,
    abi: SKILL_SHOP_ABI,
    functionName: "hasListingAccess",
    chainId: arcTestnet.id,
    args: enabled && address ? [address] : undefined,
    query: {
      enabled,
      retry: 1,
      staleTime: 15_000,
      refetchOnWindowFocus: false,
    },
  });

  return {
    listingFeeWei: feeResult.data,
    hasAccess: Boolean(accessResult.data),
    isLoading: feeResult.isLoading || (enabled && accessResult.isLoading),
    isError: feeResult.isError || accessResult.isError,
    refetch: accessResult.refetch,
  } as const;
}
