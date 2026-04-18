import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import {
  SKILL_SHOP_ABI,
  SKILL_SHOP_ADDRESS,
  USDC_ABI,
  USDC_ADDRESS,
} from "@/lib/contract";

const APPROVE_GAS_LIMIT = 80_000n;
const LISTING_GAS_LIMIT = 200_000n;

export function useListingFeePayment(listingFeeWei: bigint) {
  const approveWrite = useWriteContract();
  const listingWrite = useWriteContract();

  const approveReceipt = useWaitForTransactionReceipt({
    hash: approveWrite.data,
    query: { enabled: Boolean(approveWrite.data) },
  });

  const listingReceipt = useWaitForTransactionReceipt({
    hash: listingWrite.data,
    query: { enabled: Boolean(listingWrite.data) },
  });

  const approve = useCallback(() => {
    return approveWrite.writeContract({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      functionName: "approve",
      args: [SKILL_SHOP_ADDRESS, listingFeeWei],
      gas: APPROVE_GAS_LIMIT,
    });
  }, [approveWrite, listingFeeWei]);

  const pay = useCallback(() => {
    return listingWrite.writeContract({
      address: SKILL_SHOP_ADDRESS,
      abi: SKILL_SHOP_ABI,
      functionName: "payListingFee",
      args: [],
      gas: LISTING_GAS_LIMIT,
    });
  }, [listingWrite]);

  return {
    approve,
    pay,
    isApproving:
      approveWrite.isPending || approveReceipt.isLoading || approveReceipt.isFetching,
    isPaying:
      listingWrite.isPending || listingReceipt.isLoading || listingReceipt.isFetching,
    isApproveSuccess: approveReceipt.isSuccess,
    isPaymentSuccess: listingReceipt.isSuccess,
    approveError: approveWrite.error ?? approveReceipt.error,
    paymentError: listingWrite.error ?? listingReceipt.error,
  } as const;
}
