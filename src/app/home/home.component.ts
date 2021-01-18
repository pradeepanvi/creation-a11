import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
declare var $: any;

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
          this.initSlider();
          // this._detectViewport();
        }, 1000);
      });
  }

  initSlider() {
    $('.carousel').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ]
    });
  }

}
