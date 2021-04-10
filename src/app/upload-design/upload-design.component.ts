import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-design',
  templateUrl: './upload-design.component.html',
  styleUrls: ['./upload-design.component.scss']
})
export class UploadDesignComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  upload(files: File) {
    console.log(files);
  }

}
