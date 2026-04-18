"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import type { UploadedSkillDraft } from "@/types";
import { arcTestnet } from "@/lib/arc-chain";
import { useListingAccess } from "@/hooks/useListingAccess";
import { useListingFeePayment } from "@/hooks/useListingFeePayment";
import { WalletButton } from "./WalletButton";

type PaymentStep = "idle" | "approving" | "paying";

const STORAGE_KEY = "agentshop_uploaded_skills";

function formatPriceUsd(price: number): string {
  return `$${price.toFixed(2)} USDC`;
}

function formatUsdFromWei(value: bigint | undefined, fallback: number): string {
  if (value === undefined) return formatPriceUsd(fallback);
  return `$${(Number(value) / 1_000_000).toFixed(2)} USDC`;
}

function readStoredDrafts(): UploadedSkillDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as UploadedSkillDraft[];
  } catch {
    return [];
  }
}

function writeStoredDrafts(skills: UploadedSkillDraft[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
}

export function ListingUploader() {
  const { isConnected, chainId } = useAccount();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { listingFeeWei, hasAccess, isLoading, refetch } = useListingAccess();
  const payment = useListingFeePayment(listingFeeWei ?? 1_000_000_000n);

  const [paymentStep, setPaymentStep] = useState<PaymentStep>("idle");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("Developer Tools");
  const [priceUsd, setPriceUsd] = useState("49");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState<UploadedSkillDraft[]>([]);
  const [savedMessage, setSavedMessage] = useState("");

  const isWrongNetwork = Boolean(isConnected && chainId && chainId !== arcTestnet.id);

  useEffect(() => {
    setUploaded(readStoredDrafts());
  }, []);

  useEffect(() => {
    if (!payment.isApproveSuccess) return;
    if (paymentStep !== "approving") return;
    setPaymentStep("paying");
    payment.pay();
  }, [payment, paymentStep]);

  useEffect(() => {
    if (!payment.isPaymentSuccess) return;
    setPaymentStep("idle");
    void refetch();
  }, [payment.isPaymentSuccess, refetch]);

  const payButtonLabel = useMemo(() => {
    if (!isConnected) return "Connect Wallet";
    if (isWrongNetwork) return "Switch to Arc Testnet";
    if (hasAccess) return "Listing Fee Paid";
    if (isLoading) return "Checking access...";
    if (payment.isApproving || paymentStep === "approving") return "Approving...";
    if (payment.isPaying || paymentStep === "paying") return "Paying...";
    return `Pay ${formatUsdFromWei(listingFeeWei, 1000)} to List Your Skill`;
  }, [
    hasAccess,
    isConnected,
    isLoading,
    isWrongNetwork,
    listingFeeWei,
    payment.isApproving,
    payment.isPaying,
    paymentStep,
  ]);

  const onPay = () => {
    if (!isConnected) return;
    if (isWrongNetwork) {
      switchChain?.({ chainId: arcTestnet.id });
      return;
    }
    if (hasAccess) return;
    setPaymentStep("approving");
    payment.approve();
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasAccess || !selectedFile) return;

    const nextItem: UploadedSkillDraft = {
      id: `${Date.now()}`,
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      category,
      priceUsd: Number(priceUsd),
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      uploadedAt: new Date().toISOString(),
    };

    const next = [nextItem, ...uploaded];
    setUploaded(next);
    writeStoredDrafts(next);
    setSavedMessage("Skill draft saved locally for this MVP.");
    setTitle("");
    setShortDescription("");
    setCategory("Developer Tools");
    setPriceUsd("49");
    setSelectedFile(null);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,28,22,0.92),rgba(10,15,13,0.94))] p-6 shadow-[0_20px_70px_-45px_rgba(0,201,122,0.85)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/65">
          List Your Skill
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Upload your own Arc skill</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
          Pay a one-time listing fee of {formatUsdFromWei(listingFeeWei, 1000)} to unlock skill
          uploads. In this MVP, uploaded files and metadata are saved locally in your browser.
        </p>
        <p className="mt-3 text-sm leading-7 text-emerald-200/80">
          Full marketplace publishing, storage, and live listing support will be available soon.
        </p>

        <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/8 p-4">
          {!isConnected ? (
            <WalletButton />
          ) : (
            <button
              type="button"
              onClick={onPay}
              disabled={Boolean(
                hasAccess ||
                  isLoading ||
                  isSwitching ||
                  payment.isApproving ||
                  payment.isPaying,
              )}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {payButtonLabel}
            </button>
          )}

          {(payment.approveError || payment.paymentError) && (
            <p className="mt-3 text-xs text-red-300">
              {(payment.approveError ?? payment.paymentError)?.message}
            </p>
          )}
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                Skill title
              </span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Arc Treasury Copilot"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/40"
                required
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                Category
              </span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#102019] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/40"
              >
                <option>Developer Tools</option>
                <option>DeFi</option>
                <option>Wallets</option>
                <option>Portfolio</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Short description
            </span>
            <textarea
              value={shortDescription}
              onChange={(event) => setShortDescription(event.target.value)}
              placeholder="Describe what the skill does on Arc and what problem it solves."
              rows={4}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/40"
              required
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                Skill price
              </span>
              <input
                type="number"
                min="1"
                step="0.01"
                value={priceUsd}
                onChange={(event) => setPriceUsd(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/40"
                required
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                Skill file
              </span>
              <input
                type="file"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white file:mr-3 file:rounded-xl file:border-0 file:bg-emerald-300/15 file:px-3 file:py-2 file:text-emerald-100"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={!hasAccess || !selectedFile}
            className="inline-flex rounded-2xl border border-white/10 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Upload skill file
          </button>

          {savedMessage && <p className="text-sm text-emerald-200">{savedMessage}</p>}
        </form>
      </section>

      <aside className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,28,22,0.92),rgba(10,15,13,0.94))] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/65">
          Uploaded drafts
        </p>
        <div className="mt-4 space-y-3">
          {uploaded.length === 0 ? (
            <p className="text-sm leading-7 text-white/60">
              No uploaded skills yet. Pay the listing fee, attach a file, and save your first draft.
            </p>
          ) : (
            uploaded.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/65">{item.shortDescription}</p>
                  </div>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                    ${item.priceUsd.toFixed(2)}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/55">
                  <span>{item.category}</span>
                  <span>{item.fileName}</span>
                  <span>{Math.max(1, Math.round(item.fileSize / 1024))} KB</span>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
