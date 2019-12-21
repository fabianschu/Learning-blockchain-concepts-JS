const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash='') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        //PoW
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    //PoW
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("block mined: " + this.hash);
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("15/11/2019", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    minePendingTransactions(miningRewardAddress){
        //here we add all pending transactions (not realistic)
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined");
        this.chain.push(block);

        //give miner his reward and reset pendingTransactions
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for (const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            } 
        }
        return true;
    }
}

let fabiCoin = new Blockchain();

// create two new transactions
fabiCoin.createTransaction(new Transaction('address1', 'address2', 100));
fabiCoin.createTransaction(new Transaction('address2', 'address1', 50));

// get pending transactions and start miner
console.log("pending transactions:", fabiCoin.pendingTransactions);

// check initial balance of address 1 and 2
console.log("balances of a1 and a2: ", fabiCoin.getBalanceOfAddress('address1'), fabiCoin.getBalanceOfAddress('address2'));

// mine the block and specifiy fabian-address as receiver of reward
console.log("\nStarting the miner...");
fabiCoin.minePendingTransactions('fabian-address');

// check new balance of a1 and a2
console.log("balances of a1 and a2: ", fabiCoin.getBalanceOfAddress('address1'), fabiCoin.getBalanceOfAddress('address2'));

//check balance of miner
console.log("\nBalance of fabian is: ", fabiCoin.getBalanceOfAddress('fabian-address'));

//check pending transactions
console.log("pending transactions:", fabiCoin.pendingTransactions);

//mine new block
fabiCoin.minePendingTransactions('fabian-address');

//check new balance of miner
console.log("\nBalance of fabian is: ", fabiCoin.getBalanceOfAddress('fabian-address'));

