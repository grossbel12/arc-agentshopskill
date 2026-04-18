import { Header } from "@/components/Header";
import { ExternalBrowserHint } from "@/components/ExternalBrowserHint";
import { SkillGrid } from "@/components/SkillGrid";

export default function Home() {
  return (
    <div className="min-h-full">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <section className="relative overflow-hidden rounded-[2rem] border border-emerald-200/10 bg-[radial-gradient(circle_at_top_left,rgba(121,242,176,0.18),transparent_30%),linear-gradient(180deg,rgba(13,29,22,0.96),rgba(8,17,13,0.92))] p-8 shadow-[0_30px_80px_-45px_rgba(0,201,122,0.65)]">
          <div className="absolute inset-y-0 right-0 hidden w-72 bg-[radial-gradient(circle_at_center,rgba(121,242,176,0.18),transparent_65%)] md:block" />
          <p className="text-xs font-semibold tracking-[0.28em] text-emerald-200/80">
            ARC TESTNET | 0.1 USDC PER SKILL
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Buy ready-to-use AI skills with testnet USDC on Arc
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 md:text-base">
            Connect a wallet, approve testnet USDC once, and download a clean skill package
            with install command and config right after checkout.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-white/75">
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2">Instant package download</span>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2">Arc Testnet checkout</span>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2">USDC-only pricing</span>
          </div>
        </section>

        <SkillGrid />
        <ExternalBrowserHint />

        <footer className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-base text-white/55 md:flex-row md:items-center md:justify-between">
            <p className="text-base md:text-lg">
              AgentShop created by{" "}
              <a
                href="https://x.com/grossbel12"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-emerald-200 hover:underline"
              >
                grossbel12
              </a>
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://x.com/grossbel12"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 transition hover:text-emerald-200"
              >
                X
              </a>
              <a
                href="https://github.com/grossbel12"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 transition hover:text-emerald-200"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
