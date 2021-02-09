import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  title = "Shopping Cart";
  quantity = [
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6' },
    { value: '7' },
    { value: '8' },
    { value: '9' },
    { value: '10+' }
  ];

  cartItems: any;
  shopItems: any;

  finalCartItems: any = [];
  subTotal: number = 0;
  loaderShow = true;
  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem() {
    this.http.get('https://identitycards-3b7a2.firebaseio.com/cartPage.json').subscribe(
      (res) => {
        this.cartItems = res;
        this.getShopItem();
      }
    )
  }

  private getShopItem() {
    this.http.get('https://identitycards-3b7a2.firebaseio.com/shopPage.json').subscribe(
      (res) => {
        this.shopItems = res;
        this.setFinalCartItems();
      }
    )
  }

  private setFinalCartItems() {
    Object.keys(this.shopItems).forEach((keys) => {
      this.shopItems[keys].forEach((obj: any) => {
        this.cartItems.forEach((item: any) => {
          if (obj.product_id == item) {
            Object.assign(obj, { quantity: 1 })
            this.finalCartItems.push(obj);
            this.updateSubTotal(obj.price)
          }
        })
      })
    })
    this.loaderShow = false;
  }
  private updateSubTotal(price: number) {
    this.subTotal += price
  }

  updatePrice() {
    this.subTotal = 0;
    this.finalCartItems.forEach((item: any) => {
      this.updateSubTotal(item.price * item.quantity);
    })
  }

  removeCart(index: number) {
    this.finalCartItems.splice(index, 1);
    this.updatePrice();
  }
  continueShop() {
    this.router.navigate(['../shop'], { relativeTo: this.route });
  }
  checkout() {
    this.globalService.checkout(this.finalCartItems, this.subTotal);
  }

}
