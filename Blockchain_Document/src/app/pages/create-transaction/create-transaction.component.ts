import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
=======
import * as PDFNet from '@pdftron/pdfnet-node';

>>>>>>> ad30cad78f598ffc5ba25ece0852301741019330
import { BlockchainService, IWalletKey } from '../../services/blockchain.service';
// import { DocumentSV } from '../../Document/DocumentSV';
import { Transaction } from "../../blockchain_script/blockchain";
<<<<<<< HEAD
import * as bAll from "../../blockchain_script/blockchain";
import { map } from 'rxjs';
=======

>>>>>>> ad30cad78f598ffc5ba25ece0852301741019330

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  public newTx = new Transaction(0,'');
  public chemin : any;
  public ownWalletKey: IWalletKey;
<<<<<<< HEAD
  public data: any;
  public selectedFile : File | any;
  constructor(private blockchainService: BlockchainService, private router: Router,private http: HttpClient) {
    // this.newTx = new Transaction(0,0,0);
=======

  constructor(private blockchainService: BlockchainService, private router: Router) {

>>>>>>> ad30cad78f598ffc5ba25ece0852301741019330
    this.ownWalletKey = blockchainService.walletKeys[0];


  }

<<<<<<< HEAD

  ngOnInit() {
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(event);
  }

  createTransaction() {
    const uploadDT = new FormData();


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





=======
  async ngOnInit() {

  }

  createTransaction() {
    console.log(PDFNet.a);
    // PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
    const newTx = this.newTx;
    newTx.file =this.chemin;
    // const docsv = new DocumentSV();
    // docsv.Sign(this.chemin, '../../Document/certificatea.pfx');
    // Set the FROM address and sign the transaction
    newTx.fromAddress = this.ownWalletKey.publicKey;

    newTx.signTransaction(this.ownWalletKey.keyObj);
>>>>>>> ad30cad78f598ffc5ba25ece0852301741019330


    this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
  }
}
