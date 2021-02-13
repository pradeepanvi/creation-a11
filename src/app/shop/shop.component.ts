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
  private getCartData() {
    if (this.globalService.user) {
      this.globalService.getCartPage().subscribe(
        (res: any) => {
          if (res) {
            this.cartItem = res
          }
        }
      )
    } else {
      const cartPage = sessionStorage.getItem("cartPage");
      if (cartPage) {
        this.cartItem = JSON.parse(cartPage);
      }
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
        this.getCartData();
      });
  }
  addToCart(id: string) {
    this.cartItem.push(id);
    if (this.globalService.user) {
      this.globalService.addToCart(this.cartItem);
    } else {
      sessionStorage.setItem("cartPage", JSON.stringify(this.cartItem));
    }
  }


}
