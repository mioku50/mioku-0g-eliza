import dotenv from "dotenv";
dotenv.config(); // environment variable loaded

import { elizaLogger } from "@elizaos/core";
import { AgentNFTClient } from "./agentNFTClient";
import { parseArguments } from "./agent";

// 🔍 Check if environment variables are loaded
console.log("🔍 Проверка переменных окружения:");
console.log("ZEROG_RPC_URL:", process.env.ZEROG_RPC_URL);
console.log("ZEROG_NFT_CONTRACT_ADDRESS:", process.env.ZEROG_NFT_CONTRACT_ADDRESS);
console.log("ZEROG_PRIVATE_KEY:", process.env.ZEROG_PRIVATE_KEY ? "Loaded" : "Missing");
console.log("ZEROG_INDEXER_RPC_URL:", process.env.ZEROG_INDEXER_RPC_URL);

export const generateAgentNFT = async () => {
    elizaLogger.info("Generating NFT");
    try {
        const args = parseArguments();
        const baseDir = args.dir || "./data";

console.log("🔍 Проверка аргументов:", args);
console.log("📂 Используемый каталог:", baseDir);

const agentNFTClient = new AgentNFTClient(baseDir);

        await agentNFTClient.generateAgentNFT();
    } catch (error) {
        throw error;
    }
};

generateAgentNFT()
    .then(() => {
        elizaLogger.success("NFT generated successfully");
        process.exit(0);
    })
    .catch((error) => {
        elizaLogger.error("Unhandled error in generateNFT:", error);
        process.exit(1);
    });
