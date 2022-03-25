import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as PDFNet from '@pdftron/pdfnet-node';

import { BlockchainService, IWalletKey } from '../../services/blockchain.service';
// import { DocumentSV } from '../../Document/DocumentSV';
import { Transaction } from "../../blockchain_script/blockchain";


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

    try {
      this.blockchainService.addTransaction(this.newTx);
    } catch (e) {
      alert(e);
      return;
    }

    this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
  }
}
