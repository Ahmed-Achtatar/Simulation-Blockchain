import { Injectable } from '@angular/core';

import * as BC from "../blockchain_script/blockchain";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as EC from 'elliptic';
import { Transaction } from '../blockchain_script/blockchain';
import { Block } from '../blockchain_script/blockchain';
import { ArrayType } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public index=0;
  public blockchainInstance = new BC.Blockchain();
  public walletKeys: Array<IWalletKey> = [];
  public ownWalletKey: IWalletKey| any;
  public arrayB = [new BC.Block(Date.now(),[], '')];
  public arrayT = [new BC.Transaction('','')];
  public selectedId:any = null;


  constructor(private http: HttpClient) {
    this.blockchainInstance.difficulty = 1;
    this.generateWalletKeys();
    this.ownWalletKey = this.walletKeys[0];

  }
  retrieve (){
  this.RetrieveB();
  this.RetrieveTr();

  setTimeout(() => {this.mixBT();},1000);}
  RetrieveB(){
    this.arrayB = [new BC.Block(Date.now(),[], '')];
    this.http.get('http://localhost/Blockchain/Blockchain_Document/src/app/DB/retrieveB.php')
    .subscribe((response) => {
    var ret ;
    ret = response;

    ret.forEach(b => {
      var bl = new BC.Block(b.timestamp_B,[],b.previousHash_B);
      bl.hash = b.hash_B;
      bl.id_B = b.id_B;
      bl.nonce = b.nonce_B;
      this.arrayB.push(bl);

    });
    this.arrayB.shift();
    console.log(this.arrayB);
    });

  }

  RetrieveTr(){
    this.arrayT = [new BC.Transaction('','')];
    this.http.get('http://localhost/Blockchain/Blockchain_Document/src/app/DB/retrieveTr.php')
    .subscribe((response) => {
      var ret ;
    ret = response;

    ret.forEach(t =>{
      var tr = new BC.Transaction(t.fromHash_TR,t.docHash_TR);
      tr.id_B = t.id_B;
      // console.log("tm of tr");
      // console.log(t.timestamp_TR);
      tr.timestamp= t.timestamp_TR;
      this.arrayT.push(tr);


    });
    this.arrayT.shift();
    console.log(this.arrayT);
    });
  }
  mixBT(){
    this.blockchainInstance.chain.splice(0,this.blockchainInstance.chain.length);

    this.arrayB.forEach(bl => {

      this.arrayT.forEach(tr => {
        if(tr.id_B == bl.id_B){
          bl.transactions.push(tr);
          tr.fromAddress = this.ownWalletKey.publicKey;
          tr.signTransaction(this.ownWalletKey.keyObj);
        }
      });
      this.blockchainInstance.chain.push(bl);

    });

    console.log("arrayT");
    console.log(this.arrayT);

    console.log("arrayB");
    console.log(this.arrayB);
    console.log("chain");
    console.log(this.blockchainInstance.chain);
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

    console.log("timestamp:")
    console.log(this.blockchainInstance.getLatestBlock().timestamp)
    var num: number = 0;
    this.blockchainInstance.getLatestBlock().transactions.forEach(t => {
      num++;
      uploadDT.append("trfile" + num ,t.file);
      uploadDT.append("trTSt" + num ,t.timestamp);
      uploadDT.append("trAddress" + num ,t.fromAddress);
    });
    uploadDT.append("num",num.toString());



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
