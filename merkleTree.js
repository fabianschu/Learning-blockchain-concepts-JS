const SHA256 = require('crypto-js/sha256');

class Node {
    constructor(left, right, level) {
        this.level = level;
        this.left = left;
        this.right = right;
        this.hash = this.getHash();
    }

    getHash() {
        if(this.level === 0) {
            return SHA256(SHA256(this.left) + SHA256(this.right)).toString();
        }
        else {
            return SHA256(SHA256(this.left.hash) + SHA256(this.right.hash)).toString();
        }
    }
}

let txs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 13, 134, 3415, 315, 531, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 13, 134, 3415, 315, 531, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 13, 134, 3415, 315, 531, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 13, 134, 3415, 315, 531, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 13, 134, 3415, 315, 531, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 13, 134, 3415, 315, 531, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 13, 134, 3415, 315, 531];

let leaves = txs.map(tx => SHA256(tx));

let levelCounter = 0;

let nodes = [];

const createMerkle = value => {
    if (value.length != 1) {
        
        //duplicate last array element if odd number of elements
        if(value.length % 2 != 0) {
            value.push(value[value.length -1]);
            console.log("odd number of elements, last one duplicated");
        }

        let buffer = [];

        if(levelCounter > 0) {
            for (let i = 0; i < value.length; i += 2) {
                console.log("getting hash on level ", levelCounter);
                let left = value[i];
                let right = value[i + 1];
                let level = levelCounter;
                nodes.push(new Node(left, right, level));
                buffer.push(new Node(left, right, level));
            }
        }
        else {
            for (let i = 0; i < value.length; i += 2) {
                console.log("getting hash on level ", levelCounter);
                console.log(`elements: ${value[i]} and ${value[i + 1]}`)
                let left = value[i];
                let right = value[i+1];
                let level = levelCounter;
                nodes.push(new Node(left, right, level));
                buffer.push(new Node(left, right, level));
            }
        }

        levelCounter++;

        return createMerkle(buffer)
    } else {
        console.log(levelCounter);
        console.log(value);
        return value;
    }
}

createMerkle(txs);