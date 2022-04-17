import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BlockchainService, IWalletKey } from '../../services/blockchain.service';
import { Transaction } from "../../Blockchain/blockchain";

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  public newTx = new Transaction(0,0);
  public chemin : any;
  public ownWalletKey: IWalletKey;
  public data: any;
  public selectedFile : File | any;
  constructor(private blockchainService: BlockchainService, private router: Router,private http: HttpClient) {

    // this.newTx = new Transaction(0,0,0);
    this.ownWalletKey = blockchainService.walletKeys[0];
    this.blockchainService.retrieve();

  }


  ngOnInit() {
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  uploadPDF(){
    const uploadDT = new FormData();
    const url = "http://localhost:4200/" + (this.blockchainService.blockchainInstance.getLatestBlock().id_B + 1).toString();
    uploadDT.append("myPDF",this.selectedFile,this.selectedFile.name);
    uploadDT.append("url",url);
    this.http.post('http://localhost/Blockchain/Blockchain_Document/src/app/dbOperations/upload.php',uploadDT,{
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => {
    });
  }

  hashPDF(){
    setTimeout(() => {
    this.http.get('http://localhost/Blockchain/Blockchain_Document/src/app/dbOperations/hash.php')
    .subscribe((response) => {
      this.data = response;
      const newTx = this.newTx;
      newTx.fileHash =response;
    // Set the FROM address and sign the transaction
      newTx.fromAddress = this.ownWalletKey.publicKey;
      newTx.signTransaction(this.ownWalletKey.keyObj);
      try {
        this.blockchainService.addTransaction(this.newTx);
      } catch (e) {
        alert(e);
        return;
      }
    })}, 1000);
  }

  createTransaction() {
     this.uploadPDF();
     this.hashPDF();

    // uploadDT.append("number",blockNum);

    this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
  }
}
