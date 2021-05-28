import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { GlobalService } from '../shared/global.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  welcome: any;
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

  productForm = this.fb.group({});
  isShopNowButton: any;
  isLanyardDisabled: any;
  isUserLoggedIn = false;

  constructor(private http: HttpClient, private globalService: GlobalService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.getJSONData();
    this.isUserLoggedIn = this.globalService.user ? true : false;
    this.globalService.userObservable.subscribe((x: any) => this.isUserLoggedIn = x ? true : false);
  }

  onKey(evnt: any) {
    console.log(evnt)
  }


  getJSONData() {
    const homePageData = sessionStorage.getItem("homePage");
    if (homePageData) {
      let res = JSON.parse(homePageData);
      this.setResponse(res);
    } else {
      this.getFirebaseJSONData();
    }
  }
  getFirebaseJSONData() {
    this.globalService.getHomePage()
      .subscribe((res: any) => {
        sessionStorage.setItem("homePage", JSON.stringify(res));
        this.setResponse(res);
      });
  }

  setResponse(res: any) {
    this.welcome = res.welcome;
    this.ourService = res.ourService;
    this.ourClient = res.ourClient;
    // init Form
    this.initProductForm();
    this.addSliderItem(this.cardsSliderArray, res.cardSlider);
    this.addSliderItem(this.holdersSliderArray, res.holderSlider);
    this.addSliderItem(this.lanyardsSliderArray, res.lanyardSlider);
    // start slider
    const source = timer(1000);
    source.subscribe(() => {
      this.initSlider();
      this.loaderShow = false;
    })
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

  private initProductForm() {
    this.productForm = this.fb.group({
      cardsSlider: this.fb.array([]),
      holdersSlider: this.fb.array([]),
      lanyardsSlider: this.fb.array([])
    })
  }

  onSubmitProduct() {
    console.log(this.productForm.value);
    sessionStorage.setItem("productFormData", JSON.stringify(this.productForm.value));
    this.router.navigateByUrl('shop');
  }

  get cardsSliderArray() {
    return this.productForm.get('cardsSlider') as FormArray;
  }

  get holdersSliderArray() {
    return this.productForm.get('holdersSlider') as FormArray;
  }

  get lanyardsSliderArray() {
    return this.productForm.get('lanyardsSlider') as FormArray;
  }

  initItem(name = '', url = '', checked = false) {
    return this.fb.group({
      name: name,
      url: url,
      checked: checked
    })
  }

  addSliderItem(formSliderArray: any, originalArry: any) {
    for (let i = 0; i < originalArry.length; i++) {
      formSliderArray.push(this.initItem(originalArry[i].name, originalArry[i].url, originalArry[i].checked));
    }
  }

  @HostListener("click")
  onDropdownItemClick() {
    const productForm = this.productForm.value;
    let isChecked = false;
    let shopBtnActive = false;
    let checkLanyardDisabled = false;
    Object.keys(productForm).forEach((item) => {
      productForm[item].forEach((element: any) => {
        if (element["checked"] == true && !isChecked) {
          shopBtnActive = true;
          isChecked = true;
        }
        // lanyard
        if (item == 'lanyardsSlider' && element["checked"] == false && !checkLanyardDisabled) {
          checkLanyardDisabled = true;
        }
      });
    })
    this.isShopNowButton = shopBtnActive;
    this.isLanyardDisabled = checkLanyardDisabled;
  }

}
