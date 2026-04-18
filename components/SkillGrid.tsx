"use client";

import { useMemo, useState } from "react";
import { SKILLS } from "@/data/skills";
import type { SkillCategory } from "@/types";
import { SkillCard } from "./SkillCard";

const ALL = "All" as const;
type Filter = typeof ALL | SkillCategory;

const categories: readonly Filter[] = [ALL, "DeFi", "Developer Tools", "Wallets", "Portfolio"];

export function SkillGrid() {
  const [filter, setFilter] = useState<Filter>(ALL);

  const skills = useMemo(() => {
    if (filter === ALL) return SKILLS;
    return SKILLS.filter((s) => s.category === filter);
  }, [filter]);

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = cat === filter;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={[
                  "rounded-full border px-4 py-2 text-xs font-semibold transition",
                  active
                    ? "border-emerald-300/50 bg-emerald-300/15 text-emerald-50"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-emerald-300/30 hover:bg-emerald-300/10",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <div className="text-xs font-medium uppercase tracking-[0.22em] text-white/42">
          {skills.length} skills live
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
}
