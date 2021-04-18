import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../shared/global.service';

@Component({
  selector: 'app-preview-cards',
  templateUrl: './preview-cards.component.html',
  styleUrls: ['./preview-cards.component.scss']
})
export class PreviewCardsComponent implements OnInit {
  previewCardsData: any = {}

  constructor(private _globalService: GlobalService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.previewCardsData = this._globalService.uploadCardsData;
    const isPreivewData = sessionStorage.getItem("uploadCardsData");
    if (isPreivewData) {
      this.previewCardsData = JSON.parse(isPreivewData);
    }
  }

  editCards() {
    this.router.navigate(["/upload-cards"], { relativeTo: this.route })
  }

  confirmCards() {
    console.log(this.previewCardsData);
    sessionStorage.removeItem("uploadFile");
    this.router.navigate(["/shop"], { relativeTo: this.route });
  }

}
