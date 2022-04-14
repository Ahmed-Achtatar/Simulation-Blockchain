import { Injectable } from '@angular/core';

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


  RetrieveB(){
    this.http.get('http://localhost/Blockchain/Blockchain_Document/src/app/DB/retrieveB.php')
    .subscribe((response) => {
    var ret ;
    ret = response;
    ret.forEach(b => {
      this.blockchainInstance.chain
    });
    });
  }

  RetrieveTr(){
    this.http.get('http://localhost/Blockchain/Blockchain_Document/src/app/DB/retrieveTr.php')
    .subscribe((response) => {
      console.log(response);
    });
  }

  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
    const uploadDT = new FormData();
    // var blockNum = this.blockchainService.blockchainInstance.chain.length.toString;
    uploadDT.append("blockhash",this.blockchainInstance.getLatestBlock().hash);
    uploadDT.append("blocknonce",this.blockchainInstance.getLatestBlock().nonce);
    uploadDT.append("blockprev",this.blockchainInstance.getLatestBlock().previousHash);
    uploadDT.append("blockTSt",this.blockchainInstance.getLatestBlock().timestamp);
    var num: number = 0;
    this.blockchainInstance.getLatestBlock().transactions.forEach(t => {
      num++;
      uploadDT.append("trfile" + num ,t.file);
      uploadDT.append("trTSt" + num ,t.timestamp);
      uploadDT.append("trAddress" + num ,t.fromAddress);
    });

    uploadDT.append("num", num.toString());


    this.http.post('http://localhost/Blockchain/Blockchain_Document/src/app/DB/insertBlock.php',uploadDT,{
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => {
      console.log(event);

    });
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
  //   this.http.get('http://localhost/Blockchain/Blockchain_Document/src/app/pages/create-transaction/hash.php')
  //   .subscribe((response) => {
  //     this.blockchainInstance.pendingTransactions = response;

  // });
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
