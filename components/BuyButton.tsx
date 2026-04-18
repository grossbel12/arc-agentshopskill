"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import type { Skill } from "@/types";
import { arcTestnet } from "@/lib/arc-chain";
import { downloadSkillPackage } from "@/lib/download-skill";
import { useHasPurchased } from "@/hooks/useHasPurchased";
import { useSkillPurchase } from "@/hooks/useSkillPurchase";
import { WalletButton } from "./WalletButton";

type Step = "idle" | "approving" | "purchasing" | "done";

function formatPriceUsd(price: number): string {
  return `$${price.toFixed(2)} USDC`;
}

export function BuyButton({
  skill,
  labelMode = "price",
}: {
  readonly skill: Skill;
  readonly labelMode?: "price" | "simple";
}) {
  const { isConnected, chainId } = useAccount();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const {
    hasPurchased,
    isLoading: isPurchaseCheckLoading,
    isError: isPurchaseCheckError,
    refetch,
  } = useHasPurchased(skill.id);

  const purchaseFlow = useSkillPurchase(skill.id, skill.priceWei);
  const [step, setStep] = useState<Step>("idle");
  const [purchaseCheckTimedOut, setPurchaseCheckTimedOut] = useState(false);

  const isWrongNetwork = Boolean(isConnected && chainId && chainId !== arcTestnet.id);
  const isPurchaseCheckBlocking = isPurchaseCheckLoading && !isPurchaseCheckError && !purchaseCheckTimedOut;

  useEffect(() => {
    if (!isConnected || isWrongNetwork || !isPurchaseCheckLoading || isPurchaseCheckError) {
      setPurchaseCheckTimedOut(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPurchaseCheckTimedOut(true);
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [isConnected, isPurchaseCheckError, isPurchaseCheckLoading, isWrongNetwork]);

  const disabledReason = useMemo(() => {
    if (isPurchaseCheckBlocking) return "Checking purchase...";
    if (purchaseFlow.isApproving) return "Approving...";
    if (purchaseFlow.isPurchasing) return "Purchasing...";
    if (isSwitching) return "Switching network...";
    return null;
  }, [
    isPurchaseCheckBlocking,
    isSwitching,
    purchaseFlow.isApproving,
    purchaseFlow.isPurchasing,
  ]);

  const label = useMemo(() => {
    if (!isConnected) return "Connect Wallet";
    if (isWrongNetwork) return "Switch to Arc Testnet";
    if (hasPurchased) return "Download Skill Package";
    if (labelMode === "simple") return "Buy Skill";
    return `Buy for ${formatPriceUsd(skill.price)}`;
  }, [hasPurchased, isConnected, isWrongNetwork, labelMode, skill.price]);

  const onClick = useCallback(async () => {
    if (!isConnected) return;
    if (isWrongNetwork) {
      switchChain?.({ chainId: arcTestnet.id });
      return;
    }
    if (hasPurchased) {
      downloadSkillPackage(skill);
      return;
    }

    setStep("approving");
    purchaseFlow.approve();
  }, [hasPurchased, isConnected, isWrongNetwork, purchaseFlow, skill, switchChain]);

  useEffect(() => {
    if (!purchaseFlow.isApproveSuccess) return;
    if (step !== "approving") return;
    setStep("purchasing");
    purchaseFlow.purchase();
  }, [purchaseFlow, step]);

  useEffect(() => {
    if (!purchaseFlow.isPurchaseSuccess) return;
    if (step === "done") return;
    setStep("done");
    downloadSkillPackage(skill);
    void refetch();
  }, [purchaseFlow.isPurchaseSuccess, refetch, skill, step]);

  if (!isConnected) {
    return (
      <div className="flex">
        <WalletButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={Boolean(disabledReason)}
        onClick={onClick}
        className="inline-flex w-full items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {disabledReason ?? label}
      </button>

      {(purchaseFlow.approveError || purchaseFlow.purchaseError) && (
        <p className="text-xs text-red-300">
          {(purchaseFlow.approveError ?? purchaseFlow.purchaseError)?.message}
        </p>
      )}
    </div>
  );
}
