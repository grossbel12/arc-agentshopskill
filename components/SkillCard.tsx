import type { Skill } from "@/types";
import { BuyButton } from "./BuyButton";

function formatPriceUsd(price: number): string {
  return `$${price.toFixed(2)} USDC`;
}

function formatDownloads(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function SkillCard({ skill }: { readonly skill: Skill }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,28,22,0.92),rgba(10,15,13,0.94))] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_-40px_rgba(0,201,122,0.8)] transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:shadow-[0_0_0_1px_rgba(121,242,176,0.16),0_35px_80px_-42px_rgba(0,201,122,0.95)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent" />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/60">
            {skill.category}
          </p>
          <h3 className="mt-2 truncate text-xl font-semibold text-white">{skill.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/70">
            {skill.description}
          </p>
        </div>
        <div className="shrink-0 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
          {formatPriceUsd(skill.price)}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skill.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-white/60">
        <span>* {skill.rating.toFixed(1)}</span>
        <span>{formatDownloads(skill.downloads)} downloads</span>
      </div>

      <div className="mt-5">
        <BuyButton skill={skill} labelMode="simple" />
      </div>
    </div>
  );
}
