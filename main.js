const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash='') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "15/11/2019", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // isChainValid(){
    //     for(let i = 1; i < this.chain.length; i++) {
    //         const currentBlock = this.chain[i];
    //         const previousBlock = this.chain[i - 1];

    //         if (currentBlock.hash !== currentBlock.calculateHash()){
    //             return false;
    //         }
            
    //         if(currentBlock.previousHash !== previousBlock.hash){
    //             return false;
    //         } 
    //     }
    //     return true;
    // }
}

let fabiCoin = new Blockchain();
fabiCoin.addBlock(new Block(1, "17/11/2019", {sally: "sleeping"}));
fabiCoin.addBlock(new Block(2, "20/11/2019", {sally: "stinking"}));

console.log(fabiCoin);
// console.log("Is blockchain valid? " + fabiCoin.isChainValid());


// fabiCoin.chain[2].data = {sally: "smelling good"};
// fabiCoin.chain[2].hash = fabiCoin.chain[2].calculateHash();
// console.log("Is blockchain valid? " + fabiCoin.isChainValid());
// console.log(JSON.stringify(fabiCoin, null, 4));