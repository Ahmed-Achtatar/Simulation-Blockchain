import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { interval, take, lastValueFrom, timeout } from 'rxjs';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-verify-pdf',
  templateUrl: './verify-pdf.component.html',
  styleUrls: ['./verify-pdf.component.css']
})
export class VerifyPdfComponent implements OnInit {
  public result: number = -1;
  public selectedFile : File | any;
  public hash: any;
  public isLoading :any;
  public isFileSize = true;
  public faTriangleExclamation = faTriangleExclamation;
  constructor(private blockchainService: BlockchainService,private http: HttpClient) {
    this.blockchainService.retrieve();
  }

  ngOnInit(): void {
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

  async verifyPDF(){
    if(this.selectedFile && this.isFileSize == true){
      this.result=-1;
      this.isLoading = true;
      await this.uploadPDF();
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.hashPDF();
      this.isLoading = false;
      if(this.blockchainService.verify(this.hash)){
        this.result = 1;
      }
      else{
        this.result = 0;
      }
  }
  }
  async uploadPDF(){
    const uploadDT = new FormData();
    uploadDT.append("myPDF",this.selectedFile,this.selectedFile.name);
    await lastValueFrom(this.http.post('http://blockchain.madot.ma/assets/dbOperations/uploadV.php',uploadDT,{
      reportProgress: true,
      observe: 'events'
    }));

  }

  async hashPDF(){
    this.hash = await lastValueFrom(this.http.get('http://blockchain.madot.ma/assets/dbOperations/hashV.php'))
  }
}
