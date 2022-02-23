"use strict";
exports.__esModule = true;
exports.readf = exports.Transaction = exports.Block = exports.Blockchain = void 0;
var CryptoJS = require('crypto-js');
var Buffer = require('buffer');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

function ReadFileTransaction(file) {
    return Buffer.from(file);
}
exports.readf = ReadFileTransaction;
var Transaction = /** @class */ (function() {
    /**
     * @param {string} fromAddress
     * @param {string} toAddress
     * @param {string} file
     */
    function Transaction(fromAddress, toAddress, file) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.file = file;
        this.timestamp = Date.now();
    }
    /**
     * Creation d'un hash SHA256 de la transaction
     *
     * @returns {string}
     */
    Transaction.prototype.calculateHash = function() {
        return CryptoJS.SHA256(this.fromAddress + this.toAddress + this.file + this.timestamp).toString();
    };
    /**
     * Signe une transaction avec la clé de signature donnée (qui est une paire de clés elliptic
     * objet contenant une clé privée). La signature est alors stockée à l'intérieur du
     * objet de transaction et stocké plus tard sur la blockchain.
     *
     * @param {string} signingKey
     */
    Transaction.prototype.signTransaction = function(signingKey) {
        // Vous ne pouvez envoyer une transaction qu'à partir du portefeuille lié à votre
        // clé. Donc, ici, nous vérifions si le fromAddress correspond à votre publicKey
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('Vous ne pouvez pas signer de transactions pour d`\'autres portefeuilles !');
        }
        // Calcule le hash de cette transaction, signe-le avec la clé
        // et le stocker dans l'objet de transaction
        var hashTx = this.calculateHash();
        var sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    };
    /**
     * Vérifie si la signature est valide (la transaction n'a pas été falsifiée).
     * Il utilise fromAddress comme clé publique.
     *
     * @returns {boolean}
     */
    Transaction.prototype.isValid = function() {
        // Si la transaction n'a pas d'adresse d'expédition, nous supposons qu'il s'agit d'une
        // récompense de minage et qu'elle est valide. Vous pouvez vérifier cela dans un
        // manière différente (champ spécial par exemple)
        if (this.fromAddress === null)
            return true;
        if (!this.signature || this.signature.length === 0) {
            throw new Error('acune signature dans cette transaction');
        }
        var publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    };
    return Transaction;
}());
var Block = /** @class */ (function() {
    /**
     * @param {number} timestamp
     * @param {Transaction[]} transactions
     * @param {string} previousHash
     */
    function Block(timestamp, transactions, previousHash) {
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
    Block.prototype.calculateHash = function() {
        return CryptoJS.SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    };
    /**
     * Démarre le processus d'extraction sur le bloc. Il change le 'nonce' jusqu'au hachage
     * du bloc commence avec suffisamment de zéros (= difficulté)
     *
     * @param {number} difficulty
     */
    Block.prototype.mineBlock = function(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    };
    /**
     * Valide toutes les transactions à l'intérieur de ce bloc (signature + hash) et
     * renvoie true si tout est vérifié. Faux si le bloc n'est pas valide.
     *
     * @returns {boolean}
     */
    Block.prototype.hasValidTransactions = function() {
        for (var _i = 0, _a = this.transactions; _i < _a.length; _i++) {
            var tx = _a[_i];
            if (!tx.isValid()) {
                return false;
            }
        }
        return true;
    };
    return Block;
}());
var Blockchain = /** @class */ (function() {
    function Blockchain() {
        this.dt = Date.now();
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
    }
    /**
     * @returns {Block}
     */
    Blockchain.prototype.createGenesisBlock = function() {
        return new Block(this.dt, [], '');
    };
    /**
     * Renvoie le dernier bloc de notre chaîne. Utile lorsque vous souhaitez créer un
     * nouveau bloc et vous avez besoin du hachage du bloc précédent.
     *
     * @returns {Block[]}
     */
    Blockchain.prototype.getLatestBlock = function() {
        return this.chain[this.chain.length - 1];
    };
    /**
     * Prend toutes les transactions en attente, les met dans un bloc et démarre le
     * processus d'exploitation minière.
     *
     * @param {string} miningAddress
     */
    Blockchain.prototype.minePendingTransactions = function(miningAddress) {
        var block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = [];
    };
    /**
     * Ajouter une nouvelle transaction à la liste des transactions en attente (à ajouter
     * la prochaine fois que le processus de minage démarre). Ceci vérifie que le donné
     * la transaction est correctement signée.
     *
     * @param {Transaction} transaction
     */
    Blockchain.prototype.addTransaction = function(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('La transaction doit inclure l\'adresse d\'origine et de destination');
        }
        // Verifier la transactiion
        if (!transaction.isValid()) {
            throw new Error('Impossible d\'ajouter une transaction non valide à la chaîne');
        }
        this.pendingTransactions.push(transaction);
    };
    /**
     * Renvoie une liste de toutes les transactions qui se sont produites
     * vers et depuis l'adresse de wallet indiquée.
     *
     *
     * @param  {string} address
     * @return {Transaction[]}
     */
    Blockchain.prototype.getAllTransactionsForWallet = function(address) {
        var txs = [];
        for (var _i = 0, _a = this.chain; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var _b = 0, _c = block.transactions; _b < _c.length; _b++) {
                var tx = _c[_b];
                if (tx.fromAddress === address || tx.toAddress === address) {
                    txs.push(tx);
                }
            }
        }
        return txs;
    };
    /**
     * Boucle sur tous les blocs de la chaîne et vérifie s'ils sont correctement
     * liés ensemble et personne n'a altéré les hachages. En vérifiant
     * les blocs, il vérifie également les transactions (signées) à l'intérieur de ceux-ci.
     *
     * @returns {boolean}
     */
    Blockchain.prototype.isChainValid = function() {
        // Vérifiez si le bloc Genesis n'a pas été falsifié en comparant
        // la sortie de createGenesisBlock avec le premier bloc de notre chaîne
        var realGenesis = JSON.stringify(this.createGenesisBlock());
        if (realGenesis !== JSON.stringify(this.chain[0])) {
            return false;
        }
        // Vérifiez les blocs restants sur la chaîne pour voir s'il y a des hachages et
        // les signatures sont correctes
        for (var i = 1; i < this.chain.length; i++) {
            var currentBlock = this.chain[i];
            var previousBlock = this.chain[i - 1];
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
    };
    return Blockchain;
}());
var _Blockchain = Blockchain;
exports.Blockchain = _Blockchain;
var _Block = Block;
exports.Block = _Block;
var _Transaction = Transaction;
exports.Transaction = _Transaction;
//---------------------//
console.log('hello');
