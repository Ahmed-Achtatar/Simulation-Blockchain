"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlockchainService = void 0;
var core_1 = require("@angular/core");
var BC = require("../blockchain_script/blockchain");
var EC = require("elliptic");
var BlockchainService = /** @class */ (function () {
    function BlockchainService() {
        this.blockchainInstance = new BC.Blockchain();
        this.walletKeys = [];
        this.blockchainInstance.difficulty = 1;
        this.blockchainInstance.minePendingTransactions('hi');
        this.generateWalletKeys();
    }
    BlockchainService.prototype.minePendingTransactions = function () {
        this.blockchainInstance.minePendingTransactions(this.walletKeys[0].publicKey);
    };
    BlockchainService.prototype.addressIsFromCurrentUser = function (address) {
        return address === this.walletKeys[0].publicKey;
    };
    BlockchainService.prototype.generateWalletKeys = function () {
        var ec = new EC.ec('secp256k1');
        var key = ec.genKeyPair();
        this.walletKeys.push({
            keyObj: key,
            publicKey: key.getPublic('hex'),
            privateKey: key.getPrivate('hex')
        });
        console.log(this.walletKeys);
    };
    BlockchainService.prototype.getPendingTransactions = function () {
        return this.blockchainInstance.pendingTransactions;
    };
    BlockchainService.prototype.addTransaction = function (tx) {
        this.blockchainInstance.addTransaction(tx);
    };
    BlockchainService = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root'
        })
    ], BlockchainService);
    return BlockchainService;
}());
exports.BlockchainService = BlockchainService;
