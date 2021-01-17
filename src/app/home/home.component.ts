import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Homepage } from '../shared/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  welcome: any;
  slider: any;
  ourProduct: any;
  ourService: any;
  ourClient: any;
  slideConfig = { "slidesToShow": 4, "slidesToScroll": 4 };
  @Output() breakpoint: EventEmitter<{ event: any, slick: any, breakpoint: any }> = new EventEmitter();
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getJSONData();
  }

  getJSONData() {
    this.http
      .get('https://identitycards-3b7a2.firebaseio.com/homePage.json')
      .subscribe((res: any) => {
        this.welcome = res.welcome;
        this.slider = res.sliderItems;
        this.ourProduct = res.ourProduct;
        this.ourService = res.ourService;
        this.ourClient = res.ourClient;
        console.log(res);
        setTimeout(() => {
          // this._detectViewport();
        }, 1000);
      });
  }

}
