import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../shared/global.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  cardQtyValue = 1;
  doriQtyValue = 1;
  holderQtyValue = 1;
  restItemsForm = this.fb.group({});
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.restItemsForm = this.fb.group({
      cardType: this.fb.control('Select'),
      cardQty: this.fb.control(1),
      cardAmount: this.fb.control(26),
      doriType: this.fb.control('Select'),
      doriQty: this.fb.control(1),
      doriAmount: this.fb.control(26),
      holderType: this.fb.control('Select'),
      holderQty: this.fb.control(1),
      holderAmount: this.fb.control(26),
    })
  }

  public onSubmit() {
    console.log(this.restItemsForm.value);
    sessionStorage.setItem("cartPage", JSON.stringify(this.restItemsForm.value));
    this.router.navigate(["/cart"], { relativeTo: this.route })
  }

  public minusQty() {
    return this.cardQtyValue -= 1;
  }

  public plusQty() {
    return this.cardQtyValue += 1;
  }

  public minusDoriQty() {
    return this.doriQtyValue -= 1;
  }

  public plusDoriQty() {
    return this.doriQtyValue += 1;
  }

  public minusHolderQty() {
    return this.holderQtyValue -= 1;
  }

  public plusHolderQty() {
    return this.holderQtyValue += 1;
  }

}
