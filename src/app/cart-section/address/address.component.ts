import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { GlobalService } from 'src/app/shared/global.service';
declare var $: any;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressList: any;
  loaderShow = false;
  stripe: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _globalSerive: GlobalService,
    private http: HttpClient,
    private stripeService: AngularStripeService
  ) { }

  ngOnInit(): void {
    this.getFirebaseAddressList();
    this._globalSerive.userObservable.subscribe(res => {
      this.getFirebaseAddressList();
    })

  }

  getFirebaseAddressList() {
    if (this._globalSerive.user) {
      this._globalSerive.getAddress().subscribe(
        (res: any) => {
          this.addressList = res;
          this._globalSerive.addressList = res;
        }
      )
    } else {
      // this.showModal();
    }
  }

  showModal() {
    $('body').addClass('modal-open');
    $('.modal').css('display', 'block');
    if (!$('.modal-backdrop')) {
      $('.modal').append('<div class="modal-backdrop fade show"></div>');
    }
  }

  googleLogin() {
    $('body').find('#google_login').click();
  }
  addNewAddress() {
    this.router.navigate(['../new-address'], { relativeTo: this.route })
  }

  setAddress(index: number) {
    this.loaderShow = true;
    console.log({ address: this.addressList[index] });
    sessionStorage.setItem("deliveryAddress", JSON.stringify(this.addressList[index]));
    this.stripeService.setPublishableKey('pk_test_51IJaeQGdR5gcqr0pN9aQhpoN15knmeRUkiVGP00YhXtP76HFmlGmVde8jsa0rt9xbKjRlWJeBpG4u20BgNm5cmCm00Lw0guskA').then(
      stripe => {
        this.stripe = stripe;
        this._globalSerive.stripe = stripe;
        this.router.navigate(['/cart'], { relativeTo: this.route })
      }
    )
  }
  editAddress(index: number) {
    this.router.navigate([index], { relativeTo: this.route })
  }
  deleteAddress(index: number) {
    this.addressList.splice(index, 1);
    this._globalSerive.deleteAddress(this.addressList);
  }

}
