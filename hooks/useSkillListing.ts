import { useReadContract } from "wagmi";
import { arcTestnet } from "@/lib/arc-chain";
import { SKILL_SHOP_ABI, SKILL_SHOP_ADDRESS } from "@/lib/contract";

export function useSkillListing(skillId: 1 | 2 | 3 | 4) {
  const result = useReadContract({
    address: SKILL_SHOP_ADDRESS,
    abi: SKILL_SHOP_ABI,
    functionName: "skills",
    chainId: arcTestnet.id,
    args: [BigInt(skillId)],
    query: {
      retry: 1,
      staleTime: 15_000,
      refetchOnWindowFocus: false,
    },
  });

  const priceWei = result.data?.[1];
  const active = result.data?.[2];

  return {
    priceWei,
    active,
    isLoading: result.isLoading,
    isError: result.isError,
  } as const;
}
