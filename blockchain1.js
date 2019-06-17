// Normal BlockChain with security Features

const SHA256 = require("crypto-js/sha256");

class Block {
    constructor (index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        // we will be using SHA 256 cryptographic function to generate the hash of this block
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)+this.nonce).toString();
    }

    mineNewBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
        this.nonce++;
        this.hash = this.calculateHash();
        }
        console.log("A new block was mined with hash" + this.hash);
    }
}

class BlockChain{
    constructor(){
        // the first variable of the array will be the geneseis block, created manually
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2018","This is the Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineNewBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    checkBlockChainValid(){
        for (let i=1; i< this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            return true;
        }
    }

    // new block object
    // the hash of the previous Block
    // calculate the hash of current block 
}
// creating two new blocks
let block1 = new Block(1,"02/01/2018",{mybalance : 100});
let block2 = new Block(2,"03/01/2018",{mybalance : 50});

//creating a new block chain
let myBlockChain = new BlockChain();

//adding the new Blocks to the block chain
console.log("The first Block creation");
myBlockChain.addBlock(block1);
console.log("The second Block creation");
myBlockChain.addBlock(block2);
