import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const arcRpcUrl = process.env.ARC_RPC_URL;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;

const networks: HardhatUserConfig["networks"] = {};
if (arcRpcUrl) {
  networks.arcTestnet = {
    url: arcRpcUrl,
    chainId: 5042002,
    accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
  };
}

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks,
};

export default config;

