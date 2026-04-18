"use client";

export function ExternalBrowserHint() {
  const openCurrentPage = () => {
    window.open(window.location.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/8 p-4 text-sm text-amber-50/90">
      <p className="font-semibold text-amber-200">Wallet RPC in in-app browsers can be rate-limited.</p>
      <p className="mt-1 text-amber-50/75">
        If approve or buy keeps failing, open this page in your external browser and connect
        MetaMask, Rabby, or WalletConnect there.
      </p>
      <button
        type="button"
        onClick={openCurrentPage}
        className="mt-3 inline-flex items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/20"
      >
        Open in External Browser
      </button>
    </div>
  );
}
