import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { AgentNFT__factory } from "./contracts/factories/AgentNFT__factory";

dotenv.config();

// Подключаемся к сети
const provider = new ethers.JsonRpcProvider(process.env.ZEROG_RPC_URL);
const contractAddress = process.env.ZEROG_NFT_CONTRACT_ADDRESS;
const contract = AgentNFT__factory.connect(contractAddress, provider);

// Получаем аргументы из командной строки
const args = process.argv.slice(2);
const tokenId = args[0];  // ID NFT

if (!tokenId) {
    console.error("⛔ Ошибка: укажите ID NFT!");
    process.exit(1);
}

async function checkNFT() {
    try {
        const owner = await contract.ownerOf(tokenId);
        console.log(`✅ Владелец NFT #${tokenId}: ${owner}`);
    } catch (error) {
        console.error("⛔ Ошибка при проверке NFT:", error.reason || error.message || error);
    }
}

checkNFT();
