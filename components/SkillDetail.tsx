"use client";

import Link from "next/link";
import type { Skill } from "@/types";
import { BuyButton } from "./BuyButton";
import { SkillContent } from "./SkillContent";
import { useHasPurchased } from "@/hooks/useHasPurchased";

function formatPriceUsd(price: number): string {
  return `$${price.toFixed(2)} USDC`;
}

function formatDownloads(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function SkillDetail({ skill }: { readonly skill: Skill }) {
  const { hasPurchased, isLoading } = useHasPurchased(skill.id);

  return (
    <div>
      <Link href="/" className="text-sm font-semibold text-emerald-200">
        {"<- Back"}
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <section className="md:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h1 className="text-2xl font-semibold text-white">{skill.name}</h1>
            <p className="mt-2 text-sm text-white/70">{skill.longDescription}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-4 text-xs text-white/60">
              <span>* {skill.rating.toFixed(1)}</span>
              <span>{formatDownloads(skill.downloads)} downloads</span>
              <a
                href={skill.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-emerald-200 hover:underline"
              >
                GitHub {"->"}
              </a>
            </div>
          </div>

          {!isLoading && hasPurchased && <SkillContent skill={skill} />}
        </section>

        <aside className="md:col-span-1">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold tracking-widest text-white/60">PRICE</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {formatPriceUsd(skill.price)}
            </p>
            <p className="mt-2 text-xs text-white/60">
              Payment is an on-chain USDC transfer (6 decimals) via `SkillShop`.
            </p>

            <div className="mt-5">
              <BuyButton skill={skill} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
