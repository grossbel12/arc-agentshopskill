import type { Skill } from "@/types";

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPrefix(skill: Skill): string {
  return `${slugify(skill.name)}-${skill.id}`;
}

export function downloadSkillPackage(skill: Skill): void {
  const payload = {
    id: skill.id,
    name: skill.name,
    description: skill.longDescription,
    installCommand: skill.installCommand,
    config: skill.configJson,
    prompt:
      "Install this Arc marketplace skill and follow the bundled prompt/config to operate it on Arc Testnet.",
    githubUrl: skill.githubUrl,
  };

  downloadFile(
    JSON.stringify(payload, null, 2),
    `${getPrefix(skill)}-package.json`,
    "application/json",
  );
}

export function downloadSkillConfig(skill: Skill): void {
  downloadFile(
    JSON.stringify(skill.configJson, null, 2),
    `${getPrefix(skill)}-config.json`,
    "application/json",
  );
}
