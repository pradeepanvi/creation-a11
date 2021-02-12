import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/global.service';
import { AngularStripeService } from "@fireflysemantics/angular-stripe-service";

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

  stripe: any;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private stripeService: AngularStripeService
  ) { }

  ngOnInit(): void {
    this.getCartItem();
  }

  ngAfterViewInit() {
    this.stripeService.setPublishableKey('pk_test_51IJaeQGdR5gcqr0pN9aQhpoN15knmeRUkiVGP00YhXtP76HFmlGmVde8jsa0rt9xbKjRlWJeBpG4u20BgNm5cmCm00Lw0guskA').then(
      stripe => {
        this.stripe = stripe;
      }
    )
  }
  getCartItem() {
    const cartPageData = sessionStorage.getItem("cartPage");
    if (cartPageData) {
      this.cartItems = JSON.parse(cartPageData);
      this.getShopItem();
    } else {
      this.getFirebaseCartItem();
    }
  }

  private getFirebaseCartItem() {
    this.globalService.getCartPage().subscribe(
      (res) => {
        sessionStorage.setItem("cartPage", JSON.stringify(res));
        this.cartItems = res;
        this.getFirebaseShopItem();
      }
    )
  }

  private getShopItem() {
    const shopPageData = sessionStorage.getItem("shopPage");
    if (shopPageData) {
      this.shopItems = JSON.parse(shopPageData);
      this.setFinalCartItems();
    }
  }

  private getFirebaseShopItem() {
    this.globalService.getShopPage().subscribe(
      (res) => {
        sessionStorage.setItem("shopPage", JSON.stringify(res));
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
    // this.router.navigate(['address'], { relativeTo: this.route });
    this.http.get('https://secret-crag-27299.herokuapp.com/stripe.json').subscribe(
      (res: any) => {
        console.log(res);
        this.stripe.redirectToCheckout({
          sessionId: res.id
        }).then(function (result: any) {
          console.log(result);
        });
      }
    )
  }

}
