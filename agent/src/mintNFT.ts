import dotenv from "dotenv";
dotenv.config(); // Загружаем переменные окружения

import { ethers } from "ethers";
import fs from "fs";
import { AgentNFT__factory } from "./contracts"; // Используем фабрику контракта

// Подключаемся к сети
const provider = new ethers.JsonRpcProvider(process.env.ZEROG_RPC_URL);
const privateKey = process.env.ZEROG_PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Подключаем контракт
const contractAddress = process.env.ZEROG_NFT_CONTRACT_ADDRESS;
const agentNFT = AgentNFT__factory.connect(contractAddress, signer);

// 🔍 Укажи root hash загруженного в 0G Storage
const proofs = [""];

// Загружаем описание данных из файла
const dataDescriptions = [fs.readFileSync("./data/character_description.json", "utf8")];

// ✅ Укажи корректный Ethereum-адрес!
const ownerAddress = process.env.OWNER_WALLET_ADDRESS;

async function mintMyNFT() {
    try {
        console.log("🚀 Минтим NFT...");

        // Проверяем, что адрес корректный
        if (!ownerAddress || !ethers.isAddress(ownerAddress)) {
            throw new Error(`⛔ Ошибка: Некорректный адрес! Указан: ${ownerAddress}`);
        }

        // Вызов метода для минтинга NFT
        const tx = await agentNFT.mint(proofs, dataDescriptions, ethers.getAddress(ownerAddress));
        console.log(`📜 Транзакция отправлена: ${tx.hash}`);

        // Ждем подтверждения
        const receipt = await tx.wait();
        console.log(`✅ NFT заминчен успешно! Транзакция подтверждена, Hash: ${receipt.transactionHash}`);
    } catch (error) {
        console.error("⛔ Ошибка при минтинге NFT:", error);
    }
}

// Запускаем процесс
mintMyNFT();


