import { Component, OnInit, Input } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent implements OnInit {
  public id: number | any = 1;

  public blocks:any = [];
  public selectedBlock:any = null;

  constructor(private blockchainService: BlockchainService) {
    this.blockchainService.RetrieveB();
    this.blockchainService.RetrieveTr();
    this.blocks = blockchainService.blockchainInstance.chain;
    this.selectedBlock = this.blocks[0];
    console.log(this.blocks);
  }

  ngOnInit() {
  }

  showTransactions(block: any) {
    console.log(block);
    this.selectedBlock = block;
    return false;
  }

  blockHasTx(block: any) {
    return block.transactions.length > 0;
  }

  selectedBlockHasTx() {
    return this.blockHasTx(this.selectedBlock);
  }

  isSelectedBlock(block: any) {
    return this.selectedBlock === block;
  }

  getBlockNumber(block: any) {
    return this.blocks.indexOf(block) + 1;
  }
}
