import type { JsonObject } from "./json";

export type SkillCategory = "DeFi" | "Developer Tools" | "Wallets" | "Portfolio";

export type SkillTag =
  | "bridge"
  | "USDC"
  | "CCTP"
  | "crosschain"
  | "deploy"
  | "contracts"
  | "ERC-20"
  | "Arc"
  | "Foundry"
  | "wallets"
  | "Circle"
  | "custody"
  | "transfers"
  | "portfolio"
  | "DeFi"
  | "rebalance"
  | "gateway"
  | "all-in-one";

export interface Skill {
  readonly id: 1 | 2 | 3 | 4;
  readonly name: string;
  readonly description: string;
  readonly longDescription: string;
  readonly price: number;
  readonly priceWei: bigint;
  readonly category: SkillCategory;
  readonly tags: readonly SkillTag[];
  readonly installCommand: string;
  readonly configJson: JsonObject;
  readonly githubUrl: string;
  readonly author: string;
  readonly rating: number;
  readonly downloads: number;
}

export interface UploadedSkillDraft {
  readonly id: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly category: string;
  readonly priceUsd: number;
  readonly fileName: string;
  readonly fileSize: number;
  readonly uploadedAt: string;
}
