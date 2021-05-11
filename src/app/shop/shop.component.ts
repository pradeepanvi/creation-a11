import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../shared/global.service';
import { timer } from "rxjs";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  cardDropdown: any;
  holderDropdown: any;
  lanyardDropdown: any;
  cardQtyValue = 1;
  doriQtyValue = 1;
  holderQtyValue = 1;
  restItemsForm = this.fb.group({});
  uploadMessage = false;
  cardImg: any;
  holderImg: any;
  lanyardImg: any;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.initForm();
    this.uploadMessage = this.globalService.uploadMessage;

    const source = timer(2000);
    source.subscribe(() => this.uploadMessage = false);
    this.getShopData();
  }

  getShopData() {
    const productFormData = sessionStorage.getItem("productFormData");
    if (productFormData) {
      const finalProductFormData = JSON.parse(productFormData);
      this.setResponse(finalProductFormData);
    } else {
      this.globalService.getHomePage()
        .subscribe((res: any) => {
          sessionStorage.setItem("homePage", JSON.stringify(res));
          this.setResponse(res);
        });
    }
  }
  private setResponse(res: any) {
    this.cardDropdown = res.cardsSlider;
    this.holderDropdown = res.holdersSlider;
    this.lanyardDropdown = res.lanyardsSlider;
    this.checkProductImg();
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
    this.router.navigate(["/cart/address"], { relativeTo: this.route })
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


  selectedCard(event: any) {
    this.cardDropdown.forEach((element: any) => {
      if (element.name == event.target.value) {
        this.cardImg = element.url;
      }
    });
  }

  selectedLanydard(event: any) {
    this.lanyardDropdown.forEach((element: any) => {
      if (element.name == event.target.value) {
        this.lanyardImg = element.url;
      }
    });
  }

  selectedHolder(event: any) {
    this.holderDropdown.forEach((element: any) => {
      if (element.name == event.target.value) {
        this.holderImg = element.url;
      }
    });
  }


  private checkProductImg() {
    this.cardDropdown.forEach((element: any) => {
      if (element.checked) {
        this.cardImg = element.url;
      }
    });
    this.holderDropdown.forEach((element: any) => {
      if (element.checked) {
        this.holderImg = element.url;
      }
    });
    this.lanyardDropdown.forEach((element: any) => {
      if (element.checked) {
        this.lanyardImg = element.url;
      }
    });
  }
}