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
  subTotal = 0;
  loaderShow = true;

  stripe: any;
  serviceCharge: any = 0;
  total: any = 0;
  isDelhi = false;
  cgst: any = 0; igst: any = 0; sgst: any = 0;
  cgstfinal = 0; igstfinal = 0; sgstfinal = 0;
  serviceChargefinal = 0;
  totalfinal = 0
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _globalSerive: GlobalService,

  ) { }

  ngOnInit(): void {
    this.getCartItem();
  }

  ngAfterViewInit() {

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
      this.checkShipment();
    }
    this.loaderShow = false;
  }

  continueShop() {
    this.router.navigate(['../upload-design'], { relativeTo: this.route });
  }
  checkout() {
    this.http.get(`https://secret-crag-27299.herokuapp.com/stripe?amount=${this.totalfinal}`).subscribe(
      (res: any) => {
        console.log(res);
        this.loaderShow = false;
        this._globalSerive.stripe.redirectToCheckout({
          sessionId: res.id
        }).then(function (result: any) {
          console.log(result);
        });
      }
    )
  }

  private checkShipment() {
    const deliveryAddress = sessionStorage.getItem("deliveryAddress");
    const amount50 = 50;
    if (deliveryAddress) {
      const state = JSON.parse(deliveryAddress).state;
      if (state.toLowerCase() == "delhi") {
        this.isDelhi = true;
        if (this.subTotal <= 1500 && this.subTotal >= 50) {
          this.serviceCharge = ((this.subTotal / 15));
          this.cgst = (this.subTotal + this.serviceCharge) / 9;
          this.sgst = this.cgst;
          this.total = this.subTotal + this.cgst + this.sgst + ((this.subTotal / 15));
        } else if (this.subTotal <= 8000 && this.subTotal >= 1500) {
          this.serviceCharge = ((this.subTotal / 10));
          this.cgst = (this.subTotal + this.serviceCharge) / 9;
          this.sgst = this.cgst;
          this.total = this.subTotal + this.cgst + this.sgst + ((this.subTotal / 10));
        } else if (((this.subTotal / 4) / 10) <= amount50) {
          this.serviceCharge = amount50;
          this.cgst = (this.subTotal + this.serviceCharge) / 9;
          this.sgst = this.cgst;
          this.total = this.subTotal + this.cgst + this.sgst + amount50;
        } else {
          this.serviceCharge = ((this.subTotal / 4) / 10);
          this.cgst = (this.subTotal + this.serviceCharge) / 9;
          this.sgst = this.cgst;
          this.total = this.subTotal + this.cgst + this.sgst + ((this.subTotal / 4) / 10);
        }
      } else {
        if (this.subTotal <= 1500 && this.subTotal >= 80) {
          this.serviceCharge = (this.subTotal / 20);
          this.igst = (this.subTotal + this.serviceCharge) / 18;
          this.total = this.subTotal + this.igst + ((this.subTotal / 20));
        } else if (this.subTotal <= 10000 && this.subTotal >= 1500) {
          this.serviceCharge = ((this.subTotal / 15));
          this.igst = (this.subTotal + this.serviceCharge) / 18;
          this.total = this.subTotal + this.igst + ((this.subTotal / 15));
        } else if (((this.subTotal / 4) / 10) <= 80) {
          this.serviceCharge = 80;
          this.igst = (this.subTotal + this.serviceCharge) / 18;
          this.total = this.subTotal + this.igst + 80;
        } else {
          this.serviceCharge = ((this.subTotal / 4) / 10);
          this.igst = (this.subTotal + this.serviceCharge) / 18;
          this.total = this.subTotal + this.igst + ((this.subTotal / 4) / 10);
        }
      }
      this.serviceChargefinal = parseInt(this.serviceCharge);
      this.cgstfinal = parseInt(this.cgst);
      this.sgstfinal = parseInt(this.sgst);
      this.igstfinal = parseInt(this.igst);
      this.totalfinal = parseInt(this.total);
    }

  }

}
