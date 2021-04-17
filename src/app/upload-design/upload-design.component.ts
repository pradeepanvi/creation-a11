import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from "rxjs";
import { GlobalService } from '../shared/global.service';

@Component({
  selector: 'app-upload-design',
  templateUrl: './upload-design.component.html',
  styleUrls: ['./upload-design.component.scss']
})
export class UploadDesignComponent implements OnInit {
  percentDone: number = 0;
  uploadSuccess: boolean = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private globalService: GlobalService) { }

  ngOnInit(): void {
  }

  upload(file: any) {
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(file.target.files ? file.target.files : '');
  }

  uploadAndProgress(files: File[]) {
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))

    this.http.post('https://file.io', formData, { reportProgress: true, observe: 'events' })
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          sessionStorage.setItem("uploadFile", event.body.link)
          this.uploadSuccess = true;
          this.globalService.uploadMessage = true;
          const source = timer(2000);
          //output: 0
          source.subscribe(() => {
            this.router.navigate(["/shop"], { relativeTo: this.route })
          });
        }
      });
  }


}
