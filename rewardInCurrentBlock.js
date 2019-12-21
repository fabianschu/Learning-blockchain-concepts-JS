const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    //the hashed transaction will be signed by the sender
    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount)
                .toString();
    }

    signTransaction(signingKey){
        //check pub key that is associated with private key matches the sender's address
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You cannot sign transactions for other wallets!');
        }
        //get hash of transaction
        const hashTx = this.calculateHash();

        //sign the hashed transaction and add signature as class property
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid(){
        
        //coinbase transaction is always true
        if(this.fromAddress === null) return true;

        //make sure that signature is not missing
        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature in this transaction');
        }
        
        //get the public key of the sender
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        //check if sender's private key was actually used to sign the transaction
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block {
    constructor(timestamp, transactions, previousHash='') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("block mined: " + this.hash);
    }

    //check if transactions are valid
    hasValidTransactions(){
        //from the array of transactions check for each the validity
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }
        return true;
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
        //create a coinbase transaction and add it to pending
        let coinbaseTx = new Transaction(null, miningRewardAddress, this.miningReward);

        let block = new Block(Date.now(), [coinbaseTx, ...this.pendingTransactions]);

        block.mineBlock(this.difficulty);

        console.log("Block successfully mined");
        this.chain.push(block);

    }

    addTransaction(transaction){
        //make sure that transaction contains sender's and recipient's address
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to address');
        }

        //make sure that transaction has been signed by the sender
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }
        
        //avoid overspending
        if(this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount){
            throw new Error(`You are trying to spend ${transaction.amount}, but the balance is only ${this.getBalanceOfAddress(transaction.fromAddress)}`);
        }

        this.pendingTransactions.push(transaction)
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

            //make sure that block contains only valid transactions
            if (!currentBlock.hasValidTransactions()) {
                return false;
            }
        }
        return true;
    }
}

/* ------------- TESTING -------------- */

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//create public key (= address)
const myKey = ec.keyFromPrivate('5b4dc85997a92fb19df986dce16004d7a82dbb12918f32d1a24664da7e10bfde');
const myWalletAddress = myKey.getPublic('hex');
console.log(myWalletAddress);

//create instance of blockchain
const fabiCoin = new Blockchain();

//make a transaction to 'random' address
const tx1 = new Transaction(myWalletAddress, 'public key of recipient', 0);
tx1.signTransaction(myKey);
fabiCoin.addTransaction(tx1);

//mine block
fabiCoin.minePendingTransactions(myWalletAddress);

console.log('my balance is', fabiCoin.getBalanceOfAddress(myWalletAddress));

console.log(fabiCoin.pendingTransactions);

fabiCoin.minePendingTransactions(myWalletAddress);
console.log('my balance is', fabiCoin.getBalanceOfAddress(myWalletAddress));
/* --------- Keys ---------- */
// public: 044ab0e5e2df6ff08e541cf6b33eb0d3e9d611dc0f2428246037074b8cefd75d5a7935c420a498a38e54e5725d7d3fe1e6d8e2587acca0b54a40dcbf4e1ac6dcdd
// private: 5b4dc85997a92fb19df986dce16004d7a82dbb12918f32d1a24664da7e10bfde

