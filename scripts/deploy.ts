import hre from "hardhat";

async function main() {
  const usdcAddress = process.env.ARC_USDC_ADDRESS;
  if (!usdcAddress) {
    throw new Error("Missing env var: ARC_USDC_ADDRESS");
  }

  const { ethers } = hre;
  const SkillShop = await ethers.getContractFactory("SkillShop");
  const skillShop = await SkillShop.deploy(usdcAddress);
  await skillShop.waitForDeployment();

  const address = await skillShop.getAddress();
  // eslint-disable-next-line no-console
  console.log(`SkillShop deployed to: ${address}`);
}

main();

