import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockchainService } from '../../services/blockchain.service';
@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent implements OnInit {
  public id: number | any = 1;

  public blocks:any = [];
  public selectedBlock: any|null;

  constructor(private router: Router,private route: ActivatedRoute,private blockchainService: BlockchainService) {
    this.blocks = [];
    this.blockchainService.retrieve();
    this.blocks = this.blockchainService.blockchainInstance.chain;
    this.selectedBlock = this.blocks[0];
    setTimeout(() => {this.selectedBlock = this.blocks.find(el => el.id_B == this.blockchainService.selectedId)},1100);

  }
  async retrieved(){}
  ngOnInit() {
    this.route.params.subscribe( (params) => {
      this.blockchainService.selectedId = params['idb'];
      console.log("idb =" + this.blockchainService.selectedId);
    });
  }

  showTransactions(block: any) {
    console.log(block);

    this.selectedBlock = block;
    this.blockchainService.selectedId = this.selectedBlock.id_B;
    this.router.navigate(['',this.blockchainService.selectedId]);
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
    return this.blockchainService.selectedId;
  }
}
