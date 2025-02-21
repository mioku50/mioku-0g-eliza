git clone https://github.com/mioku50/mioku-0g-eliza.git
cd mioku-0g-eliza
cp .env.example .env

Edit the ENV file 
# ZeroG
ZEROG_RPC_URL=https://evmrpc-testnet.0g.ai
ZEROG_INDEXER_RPC_URL=https://indexer-storage-testnet-turbo.0g.ai
ZEROG_PRIVATE_KEY=
ZEROG_NFT_CONTRACT_ADDRESS=

Install dependencies

pnpm install
pnpm build

cd agent
cd data
nano character.json (give name and other description of Agent)
CTRL+X+Y
cd
cd mioku-0g-eliza
cd agent

Generate NFT
node --loader ts-node/esm src/generateNFT.ts

export OWNER_WALLET_ADDRESS=your address
echo 'export OWNER_WALLET_ADDRESS=youraddress' >> ~/.bashrc
source ~/.bashrc

Mint NFT
node --loader ts-node/esm src/mintNFT.ts

Transfer NFT 
node --loader ts-node/esm src/transferNFT.ts EVMpublicadress TokenID
