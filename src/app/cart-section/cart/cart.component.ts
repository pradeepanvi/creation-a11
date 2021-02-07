import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  title = "Shopping Cart";
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  cartV: any = [
    { name: 'id', model: 'm-dl', quantity: 1, price: 35 },
    { name: 'id card', model: 'm-dl', quantity: 1, price: 25 },
    { name: 'id', model: 'm-dl', quantity: 1, price: 25 },
    { name: 'id dori', model: 'm-dl', quantity: 1, price: 25 }
  ]
  subTotal = 0;
  priceTotal = 0;
  cartForm = new FormGroup({
    cartItems: this.fb.array([]),
    subTotal: this.fb.control(this.subTotal),
    priceTotal: this.fb.control(this.priceTotal)
  });
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.addCartItem();
    for (var i of this.cartItemsArray.controls) {
      this.subTotal += i.value.price;
      this.priceTotal += i.value.quantity * i.value.price;
    }
  }

  initItem(name: any, model: any, quantity: number, price: number) {
    return this.fb.group({
      name: name,
      model: model,
      quantity: quantity,
      price: price,
      total: quantity * price
    })
  }

  get cartItemsArray() {
    return this.cartForm.get("cartItems") as FormArray;
  }

  addCartItem() {
    for (var i of this.cartV) {
      this.cartItemsArray.push(this.initItem(i.name, i.model, i.quantity, i.price))
    }
  }

  removeCart(index: number) {
    this.cartItemsArray.removeAt(index);
  }

  private initForm() {
    this.cartForm = this.fb.group({
      cartItems: this.fb.array([]),
      subTotal: this.subTotal,
      priceTotal: this.priceTotal
    })
  }

  onSubmit() {
    // this._globalSerive.final_order.push({ order: this.cartForm.value })
    this.router.navigate(["address"], { relativeTo: this.route });
  }

  ngDoCheck() {
    this.priceTotal = 0;
    for (var i of this.cartItemsArray.controls) {
      this.priceTotal += i.value.quantity * i.value.price;
    }
    for (var x = 0; x < this.cartForm.value.cartItems.length; x++) {
      this.cartForm.value.cartItems[x].total = this.cartForm.value.cartItems[x].quantity * this.cartForm.value.cartItems[x].price;
    }
    this.cartForm.value.subTotal = this.subTotal;
    this.cartForm.value.priceTotal = this.priceTotal;
  }

  continueShop() {
    this.router.navigate(['../shop'], { relativeTo: this.route });
  }

}
