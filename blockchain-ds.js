const SHA256 = require("crypto-js/sha256");

class Blockchain{
    constructor(complication) {
        this.complication = complication || 1;
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        let newBlock = this.newBlock({data:'Genesis block'});
        newBlock.precedingHesh = '0';
        this.mineBlock(newBlock);
        newBlock.precedingHesh = newBlock.hash;
        return newBlock;
    }

    addBlock(data) {
        let newBlock = this.newBlock(data);
        newBlock.precedingHesh = this.getFinalBlock().hash;
        this.mineBlock(newBlock);
        this.chain.push(newBlock);
    }

    newBlock(data){
        return {timestamp:Date.now().toString(),
                data:data,
                nonce:0
        };
    }   

    mineBlock(newBlock) {
        newBlock.hash = this.calculateBlockHash(newBlock);
        while (newBlock.hash.substring(0, this.complication) !== Array(this.complication + 1).join("0")) {
            newBlock.nonce++;
            newBlock.hash = this.calculateBlockHash(newBlock);
        }
    }  

    calculateBlockHash(block) {
        let {timestamp,data,precedingHesh,nonce} = block;
        let heshString = '';
        data = JSON.stringify(data);
        heshString = heshString.concat(timestamp,data,precedingHesh,nonce);   
        return SHA256(heshString).toString();
    }

    getFinalBlock() {
        return this.chain[this.chain.length - 1];
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== this.calculateBlockHash(currentBlock)) {
                return false;
            }
            
           if (currentBlock.precedingHesh !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = (options)=>{return new Blockchain(options.complication)};