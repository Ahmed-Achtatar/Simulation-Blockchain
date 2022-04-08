import { Injectable } from '@angular/core';
import * as PDFNet from '@pdftron/pdfnet-node';
import { DocumentSV } from '../Document/DocumentSV';
import * as BC from "../blockchain_script/blockchain";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as EC from 'elliptic';
import { Transaction } from '../blockchain_script/blockchain';
@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockchainInstance = new BC.Blockchain();
  public walletKeys: Array<IWalletKey> = [];

  constructor(private http: HttpClient) {

    this.blockchainInstance.difficulty = 1;
    this.blockchainInstance.minePendingTransactions('hi');
    this.generateWalletKeys();

  }

  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
  }

  addressIsFromCurrentUser(address: any) {
    return address === this.walletKeys[0].publicKey;
  }

  generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });

    console.log(this.walletKeys);
  }

  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  addTransaction(tx: any) {
    this.blockchainInstance.addTransaction(tx);
  }
}

export interface IWalletKey {
  keyObj: any;
  publicKey: string;
  privateKey: string;
}
