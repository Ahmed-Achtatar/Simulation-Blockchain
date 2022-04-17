import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCube } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';
import { BlockchainService } from './services/blockchain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public blockchain;
  public showInfoMessage = true;
  public faFilePdf = faFilePdf;
public faCube =faCube

  constructor(private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchainInstance;
  }

  ngOnInit() {
  }

  thereArePendingTransactions() {
    return this.blockchain.pendingTransactions.length > 0;
  }

  dismissInfoMessage() {
    this.showInfoMessage = false;
  }
}
