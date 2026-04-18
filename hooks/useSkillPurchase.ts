import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import {
  SKILL_SHOP_ABI,
  SKILL_SHOP_ADDRESS,
  USDC_ABI,
  USDC_ADDRESS,
} from "@/lib/contract";

const APPROVE_GAS_LIMIT = 80_000n;
const PURCHASE_GAS_LIMIT = 200_000n;

export function useSkillPurchase(skillId: 1 | 2 | 3 | 4, priceWei: bigint) {
  const approveWrite = useWriteContract();
  const purchaseWrite = useWriteContract();

  const approveReceipt = useWaitForTransactionReceipt({
    hash: approveWrite.data,
    query: { enabled: Boolean(approveWrite.data) },
  });

  const purchaseReceipt = useWaitForTransactionReceipt({
    hash: purchaseWrite.data,
    query: { enabled: Boolean(purchaseWrite.data) },
  });

  const approve = useCallback(() => {
    return approveWrite.writeContract({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      functionName: "approve",
      args: [SKILL_SHOP_ADDRESS, priceWei],
      gas: APPROVE_GAS_LIMIT,
    });
  }, [approveWrite, priceWei]);

  const purchase = useCallback(() => {
    return purchaseWrite.writeContract({
      address: SKILL_SHOP_ADDRESS,
      abi: SKILL_SHOP_ABI,
      functionName: "purchase",
      args: [BigInt(skillId)],
      gas: PURCHASE_GAS_LIMIT,
    });
  }, [purchaseWrite, skillId]);

  return {
    approve,
    purchase,
    approveTxHash: approveWrite.data,
    purchaseTxHash: purchaseWrite.data,
    isApproving:
      approveWrite.isPending || approveReceipt.isLoading || approveReceipt.isFetching,
    isPurchasing:
      purchaseWrite.isPending ||
      purchaseReceipt.isLoading ||
      purchaseReceipt.isFetching,
    isApproveSuccess: approveReceipt.isSuccess,
    isPurchaseSuccess: purchaseReceipt.isSuccess,
    approveError: approveWrite.error ?? approveReceipt.error,
    purchaseError: purchaseWrite.error ?? purchaseReceipt.error,
  } as const;
}
