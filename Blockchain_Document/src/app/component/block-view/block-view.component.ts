import { Component, OnInit, Input } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCube } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit {
  @Input()
  public block : any;

  @Input()
  public selectedBlock : any;

  private blocksInChain;
  public faFilePdf =faFilePdf;
  public faCube=faCube;
  constructor(private blockchainService: BlockchainService) {
    this.blocksInChain = blockchainService.blockchainInstance.chain;
  }


  ngOnInit() {
  }

  blockHasTx() {
    return this.block.transactions.length > 0;
  }

  isSelectedBlock() {
    return this.block === this.selectedBlock;
  }

  getBlockNumber() {
    return this.blocksInChain.indexOf(this.block) + 1;
  }
}
