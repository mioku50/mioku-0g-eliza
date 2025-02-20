import { ethers } from "ethers";
import dotenv from "dotenv";
import { AgentNFT__factory } from "./contracts/factories/AgentNFT__factory";

dotenv.config();

// Подключаемся к сети
const provider = new ethers.JsonRpcProvider(process.env.ZEROG_RPC_URL);
const privateKey = process.env.ZEROG_PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Подключаем контракт
const contractAddress = process.env.ZEROG_NFT_CONTRACT_ADDRESS;
const contract = AgentNFT__factory.connect(contractAddress, signer);

// Получаем аргументы из командной строки
const args = process.argv.slice(2);
const recipient = args[0];  // Адрес получателя
const tokenId = args[1];    // ID NFT

if (!recipient || !tokenId) {
    console.error("⛔ Ошибка: укажите получателя и ID NFT!");
    process.exit(1);
}

async function transferNFT() {
    console.log(`🔄 Передача NFT #${tokenId} от ${await signer.getAddress()} к ${recipient}...`);

    try {
        // Используем transferPublic (без proof)
        const tx = await contract.transferPublic(recipient, tokenId);
        console.log(`📜 Транзакция отправлена: ${tx.hash}`);

        const receipt = await tx.wait();
        console.log("✅ Транзакция подтверждена!", receipt);
    } catch (error: any) {
        console.error("⛔ Ошибка при передаче NFT:", error.reason || error.message || error);
    }
}

transferNFT();