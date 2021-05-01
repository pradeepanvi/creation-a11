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
  cartItems: any;
  shopItems: any;

  finalCartItems: any = [];
  subTotal: number = 0;
  loaderShow = true;

  stripe: any;
  serviceCharge: number = 0;
  total: number = 0;
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
        this.globalService.stripe = stripe;
      }
    )
  }

  getCartItem() {
    const cartPage = sessionStorage.getItem("cartPage");
    if (cartPage) {
      let cartItem = JSON.parse(cartPage);
      this.cartItems = cartItem;
      console.log(this.cartItems);
      this.subTotal =
        ((this.cartItems.cardType != "Select") ? this.cartItems.cardAmount * this.cartItems.cardQty : 0) +
        ((this.cartItems.doriType != "Select") ? this.cartItems.doriAmount * this.cartItems.doriQty : 0) +
        ((this.cartItems.holderType != "Select") ? this.cartItems.holderAmount * this.cartItems.holderQty : 0);
      sessionStorage.setItem("subTotal", JSON.stringify(this.subTotal));

      if (((this.subTotal / 4) / 10) <= 50) {
        this.serviceCharge = 50;
        this.total = this.subTotal + 50;
      } else {
        this.serviceCharge = ((this.subTotal / 4) / 10);
        this.total = this.subTotal + ((this.subTotal / 4) / 10);
      }
    }
    this.loaderShow = false;
  }

  continueShop() {
    this.router.navigate(['../upload-design'], { relativeTo: this.route });
  }
  checkout() {
    this.router.navigate(['address'], { relativeTo: this.route });
  }

}
