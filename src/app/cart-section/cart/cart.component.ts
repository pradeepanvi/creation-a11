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
  loaderShow = false;

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
    const cartPage = sessionStorage.getItem("cartPage");
    if (cartPage) {
      let cartItem = JSON.parse(cartPage);
      this.cartItems = cartItem;
      console.log(this.cartItems);
      this.subTotal = (this.cartItems.cardAmount * this.cartItems.cardQty) + (this.cartItems.doriAmount * this.cartItems.doriQty) + (this.cartItems.holderAmount * this.cartItems.holderQty)
    }
  }

  continueShop() {
    this.router.navigate(['../shop'], { relativeTo: this.route });
  }
  checkout() {
    this.globalService.checkout(this.finalCartItems, this.subTotal);
    this.router.navigate(['address'], { relativeTo: this.route });
  }

}
