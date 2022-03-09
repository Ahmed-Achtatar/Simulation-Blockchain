import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PDFNet } from '@pdftron/pdfnet-node';
import { BlockchainService, IWalletKey } from '../../services/blockchain.service';
// import { DocumentSV } from '../../Document/DocumentSV';
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
    // const docsv = new DocumentSV();
    // docsv.Sign(this.chemin, '../../Document/certificatea.pfx');
    // Set the FROM address and sign the transaction
    newTx.fromAddress = this.ownWalletKey.publicKey;
    
    newTx.signTransaction(this.ownWalletKey.keyObj);

    try {
      this.blockchainService.addTransaction(this.newTx);
    } catch (e) {
      alert(e);
      return;
    }

    this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
  }
}
