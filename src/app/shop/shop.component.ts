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
    this.getJSONData();
  }

  getCartData() {
    const cartPageData = sessionStorage.getItem("cartPage");
    if (cartPageData) {
      this.cartItem = JSON.parse(cartPageData);
    } else {
      this.getFirebaseCartData();
    }
  }

  private getFirebaseCartData() {
    this.globalService.getCartPage().subscribe(
      (res: any) => {
        sessionStorage.setItem("cartPage", JSON.stringify(res));
        this.cartItem = res;
      }
    )
  }

  getJSONData() {
    const shopPageData = sessionStorage.getItem("shopPage");
    if (shopPageData) {
      let res = JSON.parse(shopPageData);
      this.doriItems = res.doriItems;
      this.cardItems = res.cardItems;
      this.holderItems = res.holderItems;
      this.lanyardItems = res.lanyardItems;
      this.getCartData();
    } else {
      this.getFirebaseJSONData();
    }
  }

  getFirebaseJSONData() {
    this.globalService.getShopPage().subscribe(
      (res: any) => {
        Object.assign(res, { addedToCart: false })
        sessionStorage.setItem("shopPage", JSON.stringify(res));
        this.doriItems = res.doriItems;
        this.cardItems = res.cardItems;
        this.holderItems = res.holderItems;
        this.lanyardItems = res.lanyardItems;
        this.getCartData();
      });
  }
  addToCart(id: string) {
    this.cartItem.push(id);
    this.globalService.addToCart(this.cartItem);
    sessionStorage.removeItem("cartPage");
  }

}
