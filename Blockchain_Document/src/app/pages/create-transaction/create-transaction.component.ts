import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BlockchainService, IWalletKey } from '../../services/blockchain.service';

import { Transaction } from "../../blockchain_script/blockchain";
import * as bAll from "../../blockchain_script/blockchain";
import { map } from 'rxjs';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  public newTx = new Transaction(0,0,0);
  public chemin : any;
  public ownWalletKey: IWalletKey;
  public data: any;
  public selectedFile : File | any;
  constructor(private blockchainService: BlockchainService, private router: Router,private http: HttpClient) {
    // this.newTx = new Transaction(0,0,0);
    this.ownWalletKey = blockchainService.walletKeys[0];


  }


  ngOnInit() {
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(event);
  }

  createTransaction() {
    const uploadDT = new FormData();
    // var blockNum = this.blockchainService.blockchainInstance.chain.length.toString;
    uploadDT.append("myPDF",this.selectedFile,this.selectedFile.name);
    // uploadDT.append("number",blockNum);

    this.http.post('http://localhost/Blockchain/Blockchain_Document/src/app/pages/create-transaction/upload.php',uploadDT,{
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => {
      console.log(event);
    })

    this.http.get('http://localhost/Blockchain/Blockchain_Document/src/app/pages/create-transaction/hash.php')
    .subscribe((response) => {
      this.data = response;
      console.log(this.data);
      const newTx = this.newTx;
      newTx.file =response;
    // Set the FROM address and sign the transaction
      newTx.fromAddress = this.ownWalletKey.publicKey;
      newTx.signTransaction(this.ownWalletKey.keyObj);
      try {
        this.blockchainService.addTransaction(this.newTx);
      } catch (e) {
        alert(e);
        return;
      }

    });







    this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
  }
}
