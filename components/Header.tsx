"use client";

import Link from "next/link";
import { WalletButton } from "./WalletButton";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <Link href="/" className="text-lg font-semibold tracking-tight text-white">
              AgentShop
            </Link>
            <p className="text-xs text-white/60">Marketplace for AI Skills on Arc</p>
          </div>
          <nav className="hidden gap-3 md:flex">
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:border-emerald-300/30 hover:bg-emerald-300/10 hover:text-white"
            >
              Marketplace
            </Link>
            <Link
              href="/list-skill"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:border-emerald-300/30 hover:bg-emerald-300/10 hover:text-white"
            >
              List Your Skill
            </Link>
          </nav>
        </div>
        <WalletButton />
      </div>
    </header>
  );
}
