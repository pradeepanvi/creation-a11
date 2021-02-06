import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  loaderShow = true;
  askQF = new FormGroup({
    name: this.fb.control('', Validators.required),
    mail: this.fb.control('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone: this.fb.control('', [Validators.required]),
    msg: this.fb.control('', Validators.required),
  });
  constructor(private http: HttpClient, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.getJSONData();
  }



  getJSONData() {
    let homePageData = localStorage.getItem("homePage");
    if (homePageData) {
      let res = JSON.parse(homePageData);
      this.welcome = res.welcome;
      this.slider = res.sliderItems;
      this.ourProduct = res.ourProduct;
      this.ourService = res.ourService;
      this.ourClient = res.ourClient;
      setTimeout(() => {
        this.initSlider();
        this.loaderShow = false;
      }, 1000);
    } else {
      this.getFirebaseJSONData();
    }
  }
  getFirebaseJSONData() {
    this.http
      .get('https://identitycards-3b7a2.firebaseio.com/homePage.json')
      .subscribe((res: any) => {
        localStorage.setItem("homePage", JSON.stringify(res));
        this.welcome = res.welcome;
        this.slider = res.sliderItems;
        this.ourProduct = res.ourProduct;
        this.ourService = res.ourService;
        this.ourClient = res.ourClient;
        console.log(res);
        setTimeout(() => {
          this.initSlider();
          this.loaderShow = false;
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
  onSubmit() {
    this.http
      .post('http://beta.identitycards.co.in/send.php', this.askQF.value)
      .subscribe(() => {
        this.addClass('thank-you');
      });
  }

  addClass(className: string) {
    document.querySelector('#contact')?.classList.add(className);
  }
  removeClass(className: string) {
    this.askQF.reset();
    document.querySelector('#contact')?.classList.remove(className);
  }

}
