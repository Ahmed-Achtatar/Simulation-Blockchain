const crypto = require('crypto');
const CryptoJS = require('crypto-js');
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');
const fs = require('fs');


function ReadFileTransaction() {
  return Buffer.from(fs.readFileSync('omar.txt'));
}

class Transaction {
	public fromAddress: any;
	public toAddress: any;
	public file: any;
	public timestamp: any;
	public signature: any;



    /**
     * @param {string} fromAddress
     * @param {string} toAddress
     * @param {number} file
     */
    constructor(fromAddress:any, toAddress:any, file:any) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.file = file;
        this.timestamp = Date.now();
    }


    /*
     * Creates a SHA256 hash of the transaction
     *
     * @returns {string}
     */
    calculateHash(): string {
        return CryptoJS.SHA256(this.fromAddress + this.toAddress + this.file + this.timestamp).toString();
    }

    /**
     * Signs a transaction with the given signingKey (which is an Elliptic keypair
     * object that contains a private key). The signature is then stored inside the
     * transaction object and later stored on the blockchain.
     *
     * @param {string} signingKey
     */
    signTransaction(signingKey:any) {
        // You can only send a transaction from the wallet that is linked to your
        // key. So here we check if the fromAddress matches your publicKey
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets!');
        }


        // Calculate the hash of this transaction, sign it with the key
        // and store it inside the transaction obect
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');

        this.signature = sig.toDER('hex');
    }

    /**
     * Checks if the signature is valid (transaction has not been tampered with).
     * It uses the fromAddress as the public key.
     *
     * @returns {boolean}
     */
    isValid(): boolean {
        // If the transaction doesn't have a from address we assume it's a
        // mining reward and that it's valid. You could verify this in a
        // different way (special field for instance)
        if (this.fromAddress === null) return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block {
	public previousHash: any;
	public timestamp: any;
	public transactions: any;
	public nonce: any;
	public hash: any;

    /**
     * @param {number} timestamp
     * @param {Transaction[]} transactions
     * @param {string} previousHash
     */
    constructor(timestamp: number, transactions: Transaction[], previousHash: string = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    /**
     * Returns the SHA256 of this block (by processing all the data stored
     * inside this block)
     *
     * @returns {string}
     */
    calculateHash(): string {
        return CryptoJS.SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    /**
     * Starts the mining process on the block. It changes the 'nonce' until the hash
     * of the block starts with enough zeros (= difficulty)
     *
     * @param {number} difficulty
     */
    mineBlock(difficulty: number) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

    }

    /**
     * Validates all the transactions inside this block (signature + hash) and
     * returns true if everything checks out. False if the block is invalid.
     *
     * @returns {boolean}
     */
    hasValidTransactions(): boolean {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }
}

class Blockchain {
	public chain: any;
	public difficulty: any;
	public pendingTransactions: any;
	public miningReward: any;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    /**
     * @returns {Block}
     */
    createGenesisBlock(): Block {
        return new Block(Date.parse('2017-01-01'), [], '0');
    }

    /**
     * Returns the latest block on our chain. Useful when you want to create a
     * new Block and you need the hash of the previous Block.
     *
     * @returns {Block}
     */
    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Takes all the pending transactions, puts them in a Block and starts the
     * mining process. It also adds a transaction to send the mining reward to
     * the given address.
     *
     * @param {string} miningRewardAddress
     */
    minePendingTransactions(miningRewardAddress: string) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        this.chain.push(block);

        this.pendingTransactions = [];
    }

    /**
     * Add a new transaction to the list of pending transactions (to be added
     * next time the mining process starts). This verifies that the given
     * transaction is properly signed.
     *
     * @param {Transaction} transaction
     */
    addTransaction(transaction: Transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address');
        }

        // Verify the transactiion
        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        if (transaction.file <= 0) {
            throw new Error('Transaction file should be higher than 0');
        }

        // Making sure that the file sent is not greater than existing balance
        if (this.getBalanceOfAddress(transaction.fromAddress) < transaction.file) {
            throw new Error('Not enough balance');
        }

        this.pendingTransactions.push(transaction);

    }

    /**
     * Returns the balance of a given wallet address.
     *
     * @param {string} address
     * @returns {number} The balance of the wallet
     */
    getBalanceOfAddress(address: string): number {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.file;
                }

                if (trans.toAddress === address) {
                    balance += trans.file;
                }
            }
        }
        return balance;
    }

    /**
     * Returns a list of all transactions that happened
     * to and from the given wallet address.
     *
     * @param  {string} address
     * @return {Transaction[]}
     */
    getAllTransactionsForWallet(address: string): Transaction[] {
        const txs:any = [];

        for (const block of this.chain) {
            for (const tx of block.transactions) {
                if (tx.fromAddress === address || tx.toAddress === address) {
                    txs.push(tx);
                }
            }
        }

        return txs;
    }

    /**
     * Loops over all the blocks in the chain and verify if they are properly
     * linked together and nobody has tampered with the hashes. By checking
     * the blocks it also verifies the (signed) transactions inside of them.
     *
     * @returns {boolean}
     */
    isChainValid(): boolean {
        // Check if the Genesis block hasn't been tampered with by comparing
        // the output of createGenesisBlock with the first block on our chain
        const realGenesis = JSON.stringify(this.createGenesisBlock());

        if (realGenesis !== JSON.stringify(this.chain[0])) {
            return false;
        }

        // Check the remaining blocks on the chain to see if there hashes and
        // signatures are correct
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (previousBlock.hash !== currentBlock.previousHash) {
                return false;
            }

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
        }

        return true;
    }
}

const _Blockchain = Blockchain;
export { _Blockchain as Blockchain };
const _Block = Block;
export { _Block as Block };
const _Transaction = Transaction;
export { _Transaction as Transaction };
