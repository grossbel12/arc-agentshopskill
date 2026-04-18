import Link from "next/link";
import { Header } from "@/components/Header";
import { SKILLS } from "@/data/skills";
import { SkillDetail } from "@/components/SkillDetail";

export default async function SkillPage({
  params,
}: {
  readonly params: Promise<{ readonly id: string }>;
}) {
  const { id } = await params;
  const skillId = Number(id);
  const skill = SKILLS.find((s) => s.id === skillId);

  if (!skill) {
    return (
      <div className="min-h-full">
        <Header />
        <main className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/80">Skill not found.</p>
            <Link href="/" className="mt-4 inline-flex text-sm font-semibold text-emerald-200">
              {"<- Back to marketplace"}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <SkillDetail skill={skill} />
      </main>
    </div>
  );
}
