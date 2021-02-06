import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  doriItems: any;
  holderItems: any;
  cardItems: any;
  lanyardItems: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getJSONData();
  }

  getJSONData() {
    let shopPageData = localStorage.getItem("shopPage");
    if (shopPageData) {
      let res = JSON.parse(shopPageData);
      this.doriItems = res.doriItems;
      this.cardItems = res.cardItems;
      this.holderItems = res.holderItems;
      this.lanyardItems = res.lanyardItems;
    } else {
      this.getFirebaseJSONData();
    }
  }

  getFirebaseJSONData() {
    this.http.get('https://identitycards-3b7a2.firebaseio.com/shopPage.json').subscribe(
      (res: any) => {
        localStorage.setItem("shopPage", JSON.stringify(res));
        this.doriItems = res.doriItems;
        this.cardItems = res.cardItems;
        this.holderItems = res.holderItems;
        this.lanyardItems = res.lanyardItems;
      });
  }

}
