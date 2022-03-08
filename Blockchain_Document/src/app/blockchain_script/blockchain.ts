
import { PDFNet } from '@pdftron/pdfnet-node';
import * as CryptoJS from 'crypto-js';

import { DocumentSV } from '../Document/DocumentSV';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


// function ReadFileTransaction(filepath : string) {
//   return Buffer.from(fs.readFileSync(filepath));

// }
class Transaction {
	public fromAddress : any;
	public file: any;
	public timestamp: any;
	public signature: any;

    /**
     * @param {string} fromAddress
     * @param {string} toAddress
     * @param {string} file
     */
    constructor(fromAddress: any, toAddress: any, file: any) {
      this.file = file;
        this.fromAddress = fromAddress;

        this.file = file;


        this.timestamp = Date.now();

    }

    /**
     * Creation d'un hash SHA256 de la transaction
     *
     * @returns {string}
     */
    calculateHash() : string {

      let docsv = new DocumentSV();
      let pdfhash : string = '';
      // PDFNet.runWithCleanup(docsv.getHash,'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
      docsv.getHash(this.file).then(value => pdfhash = value);
      return CryptoJS.SHA256(this.fromAddress + pdfhash + this.timestamp).toString();
    }

    /**
     * Signe une transaction avec la clé de signature donnée (qui est une paire de clés elliptic
     * objet contenant une clé privée). La signature est alors stockée à l'intérieur du
     * objet de transaction et stocké plus tard sur la blockchain.
     *
     * @param {string} signingKey
     */
    signTransaction(signingKey: any) {
      // let docsv = new DocumentSV();
        // docsv.Sign(this.file, 'src/app/Document/certificatea.pfx');
        // Vous ne pouvez envoyer une transaction qu'à partir du portefeuille lié à votre
        // clé. Donc, ici, nous vérifions si le fromAddress correspond à votre publicKey
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('Vous ne pouvez pas signer de transactions pour d`\'autres portefeuilles !');
        }


        // Calcule le hash de cette transaction, signe-le avec la clé
        // et le stocker dans l'objet de transaction
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');

        this.signature = sig.toDER('hex');

    }

    /**
     * Vérifie si la signature est valide (la transaction n'a pas été falsifiée).
     * Il utilise fromAddress comme clé publique.
     *
     * @returns {boolean}
     */
    isValid(): boolean {
        // Si la transaction n'a pas d'adresse d'expédition, nous supposons qu'il s'agit d'une
        // récompense de minage et qu'elle est valide. Vous pouvez vérifier cela dans un
        // manière différente (champ spécial par exemple)
        if (this.fromAddress === null) return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error('acune signature dans cette transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block {
	public previousHash: any;
	public timestamp: any;
	public transactions: Transaction[];
	public nonce: any;
	public hash: any;

    /**
     * @param {number} timestamp
     * @param {Transaction[]} transactions
     * @param {string} previousHash
     */
    constructor(timestamp: number, transactions: Transaction[], previousHash: string) {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    /**
     * Renvoie le SHA256 de ce bloc (en traitant toutes les données stockées
     * à l'intérieur de ce bloc)
     *
     * @returns {string}
     */
    calculateHash(): string {
        return CryptoJS.SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    /**
     * Démarre le processus d'extraction sur le bloc. Il change le 'nonce' jusqu'au hachage
     * du bloc commence avec suffisamment de zéros (= difficulté)
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
     * Valide toutes les transactions à l'intérieur de ce bloc (signature + hash) et
     * renvoie true si tout est vérifié. Faux si le bloc n'est pas valide.
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
	public dt: any;
	public chain: any;
	public difficulty: any;
	public pendingTransactions: any;

    constructor() {
        this.dt = Date.now();
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
    }

    /**
     * @returns {Block}
     */
    createGenesisBlock(): Block {
        return new Block(this.dt, [], '');
    }

    /**
     * Renvoie le dernier bloc de notre chaîne. Utile lorsque vous souhaitez créer un
     * nouveau bloc et vous avez besoin du hachage du bloc précédent.
     *
     * @returns {Block[]}
     */
    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Prend toutes les transactions en attente, les met dans un bloc et démarre le
     * processus d'exploitation minière.
     *
     * @param {string} miningAddress
     */
    minePendingTransactions(miningAddress: string) {

        const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);


        this.chain.push(block);

        this.pendingTransactions = [];
    }

    /**
     * Ajouter une nouvelle transaction à la liste des transactions en attente (à ajouter
     * la prochaine fois que le processus de minage démarre). Ceci vérifie que le donné
     * la transaction est correctement signée.
     *
     * @param {Transaction} transaction
     */
    addTransaction(transaction: Transaction) {
        if (!transaction.fromAddress) {
            throw new Error('La transaction doit inclure l\'adresse d\'origine ');
        }

        // Verifier la transactiion
        if (!transaction.isValid()) {
            throw new Error('Impossible d\'ajouter une transaction non valide à la chaîne');
        }

        this.pendingTransactions.push(transaction);

    }


    /**
     * Renvoie une liste de toutes les transactions qui se sont produites
     * vers et depuis l'adresse de wallet indiquée.
     *
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
     * Boucle sur tous les blocs de la chaîne et vérifie s'ils sont correctement
     * liés ensemble et personne n'a altéré les hachages. En vérifiant
     * les blocs, il vérifie également les transactions (signées) à l'intérieur de ceux-ci.
     *
     * @returns {boolean}
     */
    isChainValid(): boolean {
        // Vérifiez si le bloc Genesis n'a pas été falsifié en comparant
        // la sortie de createGenesisBlock avec le premier bloc de notre chaîne
        const realGenesis = JSON.stringify(this.createGenesisBlock());

        if (realGenesis !== JSON.stringify(this.chain[0])) {
            return false;
        }

        // Vérifiez les blocs restants sur la chaîne pour voir s'il y a des hachages et
        // les signatures sont correctes
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
// export { ReadFileTransaction as readf }

//---------------------//

console.log('hello');
