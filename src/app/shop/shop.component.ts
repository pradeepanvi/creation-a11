import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/global.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  doriItems: any;
  holderItems: any;
  cardItems: any;
  lanyardItems: any;

  cartItem: string[] = [];
  constructor(private http: HttpClient, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.getFirebaseJSONData();
  }
  private getFirebaseCartData() {
    if (this.globalService.user.id) {
      this.globalService.getCartPage().subscribe(
        (res: any) => {
          if (res) {
            this.cartItem = res;
          }
        }
      )
    }
  }
  getFirebaseJSONData() {
    this.globalService.getShopPage().subscribe(
      (res: any) => {
        Object.assign(res, { addedToCart: false })
        this.doriItems = res.doriItems;
        this.cardItems = res.cardItems;
        this.holderItems = res.holderItems;
        this.lanyardItems = res.lanyardItems;
        this.getFirebaseCartData();
      });
  }
  addToCart(id: string) {
    this.cartItem.push(id);
    this.globalService.addToCart(this.cartItem);
  }

}
