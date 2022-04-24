import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BlockchainService, IWalletKey } from '../../services/blockchain.service';
import { Transaction } from "../../Blockchain/blockchain";
import { interval, take, lastValueFrom } from 'rxjs';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  public newTx = new Transaction(0,0);
  public chemin : any;
  public ownWalletKey: IWalletKey;
  public isLoading;
  public selectedFile : File | any;
  public isFileSize = true;
  public faTriangleExclamation = faTriangleExclamation;
  constructor(private blockchainService: BlockchainService, private router: Router,private http: HttpClient) {

    // this.newTx = new Transaction(0,0,0);
    this.ownWalletKey = blockchainService.walletKeys[0];
    this.blockchainService.retrieve();

  }


  ngOnInit() {
  }
  onFileChanged(event) {
    if(event.target.files[0].size < 5000000){
      this.isFileSize = true;
      this.selectedFile = event.target.files[0];
    }
    else{
      this.isFileSize = false;
    }
    console.log(this.isFileSize);
  }

  async uploadPDF(){
    const uploadDT = new FormData();
    var id = Number(await this.blockchainService.blockchainInstance.getLatestBlock().id_B) + 1;

    const url = "http://blockchain.madot.ma/#/" + (id).toString();
    uploadDT.append("myPDF",this.selectedFile,this.selectedFile.name);
    uploadDT.append("url",url);
    await lastValueFrom(this.http.post('http://blockchain.madot.ma/assets/dbOperations/upload.php',uploadDT,{
      reportProgress: true,
      observe: 'events'
    }));
  }

  async hashPDF(){
    const newTx = this.newTx;

    this.newTx.fileHash = await lastValueFrom(this.http.get('http://blockchain.madot.ma/assets/dbOperations/hash.php'))

    newTx.fromAddress = this.ownWalletKey.publicKey;
    newTx.signTransaction(this.ownWalletKey.keyObj);
    try {
      this.blockchainService.addTransaction(this.newTx);
    } catch (e) {
      alert(e);
      return;
    }
  }

  async createTransaction() {

    if(this.selectedFile && this.isFileSize == true){
      this.isLoading = true;
      await this.uploadPDF();
       await this.hashPDF();
       document.location.href = 'http://blockchain.madot.ma/assets/uploaded/etest.pdf';

    // uploadDT.append("number",blockNum);

      await this.router.navigate(['/new/transaction/pending', { addedTx: true }]); this.isLoading = true;}
  }
}
