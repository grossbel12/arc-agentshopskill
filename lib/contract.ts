import { type Address, type Abi } from "viem";
import { env } from "./env";

export const SKILL_SHOP_ADDRESS = (env.skillShopAddress ?? "0x0000000000000000000000000000000000000000") as Address;
export const USDC_ADDRESS = (env.usdcAddress ?? "0x0000000000000000000000000000000000000000") as Address;

export const SKILL_SHOP_ABI = [
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "skills",
    stateMutability: "view",
    inputs: [{ name: "", type: "uint256" }],
    outputs: [
      { name: "id", type: "uint256" },
      { name: "price", type: "uint256" },
      { name: "active", type: "bool" },
    ],
  },
  {
    type: "function",
    name: "purchase",
    stateMutability: "nonpayable",
    inputs: [{ name: "skillId", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "listingFee",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "hasListingAccess",
    stateMutability: "view",
    inputs: [{ name: "seller", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "payListingFee",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "checkPurchase",
    stateMutability: "view",
    inputs: [
      { name: "buyer", type: "address" },
      { name: "skillId", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "event",
    name: "SkillPurchased",
    inputs: [
      { name: "buyer", type: "address", indexed: true },
      { name: "skillId", type: "uint256", indexed: true },
      { name: "price", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
] as const satisfies Abi;

export const USDC_ABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const satisfies Abi;
