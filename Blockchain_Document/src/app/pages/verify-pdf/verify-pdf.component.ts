import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-pdf',
  templateUrl: './verify-pdf.component.html',
  styleUrls: ['./verify-pdf.component.css']
})
export class VerifyPdfComponent implements OnInit {
  public selectedFile : File | any;
  constructor() { }

  ngOnInit(): void {
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(event);
  }

  verifyPDF(){

  }

}
