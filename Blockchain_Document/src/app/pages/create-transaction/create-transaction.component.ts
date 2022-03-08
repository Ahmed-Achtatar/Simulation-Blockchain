import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PDFNet } from '@pdftron/pdfnet-node';
import { BlockchainService, IWalletKey } from '../../services/blockchain.service';
import { DocumentSV } from '../../Document/DocumentSV';
import { Transaction } from "../../blockchain_script/blockchain";
import * as bAll from "../../blockchain_script/blockchain";

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  public newTx = new Transaction(0,'');
  public chemin : any;
  public ownWalletKey: IWalletKey;

  constructor(private blockchainService: BlockchainService, private router: Router) {
    this.ownWalletKey = blockchainService.walletKeys[0];
  }

  ngOnInit() {
  }

  
  
  createTransaction() {
    const newTx = this.newTx;
    newTx.file =this.chemin;
    newTx.fromAddress = this.ownWalletKey.publicKey;
    const keyobj = this.ownWalletKey.keyObj;
    function createtr(){
      try {
      
      const docsv = new DocumentSV();
      docsv.Sign(newTx.file, '../../Document/certificatea.pfx');
      // Set the FROM address and sign the transaction
      
      
      newTx.signTransaction(keyobj);
  
      
        
      } catch (e) {
        alert(e);
        return;
      }
  
      
    }
    
  PDFNet.runWithCleanup(createtr,'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
  this.blockchainService.addTransaction(newTx);
  this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
}}
