"use client";

import { useCallback, useMemo, useState } from "react";
import type { Skill } from "@/types";
import { downloadSkillConfig, downloadSkillPackage } from "@/lib/download-skill";

function stringifyJson(value: Skill["configJson"]): string {
  return JSON.stringify(value, null, 2);
}

export function SkillContent({ skill }: { readonly skill: Skill }) {
  const [copied, setCopied] = useState(false);

  const configText = useMemo(() => stringifyJson(skill.configJson), [skill.configJson]);

  const copyInstall = useCallback(async () => {
    await navigator.clipboard.writeText(skill.installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }, [skill.installCommand]);

  return (
    <section className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5">
      <h2 className="text-sm font-semibold text-emerald-100">Purchased content</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => downloadSkillPackage(skill)}
          className="rounded-xl border border-emerald-300/30 bg-black/20 px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-black/30"
        >
          Download Skill Package
        </button>
        <button
          type="button"
          onClick={() => downloadSkillConfig(skill)}
          className="rounded-xl border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/12"
        >
          Download Config JSON
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-emerald-100/80">Install command</p>
          <button
            type="button"
            onClick={copyInstall}
            className="rounded-lg border border-emerald-300/30 bg-black/20 px-3 py-1 text-xs font-semibold text-emerald-100 transition hover:bg-black/30"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="mt-2 overflow-x-auto rounded-xl border border-black/20 bg-black/30 p-3 font-mono text-xs text-emerald-50">
          <code>{skill.installCommand}</code>
        </pre>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-emerald-100/80">Config JSON</p>
        <pre className="mt-2 overflow-x-auto rounded-xl border border-black/20 bg-black/30 p-3 font-mono text-xs text-emerald-50">
          <code>{configText}</code>
        </pre>
      </div>
    </section>
  );
}
