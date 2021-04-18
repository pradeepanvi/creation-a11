import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/global.service';
declare var $: any;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressList: any;
  constructor(private route: ActivatedRoute, private router: Router, private _globalSerive: GlobalService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getFirebaseAddressList();
  }
  ngAfterViewInit() {
    this.getFirebaseAddressList();
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
    console.log({ address: this.addressList[index] });
    sessionStorage.setItem("deliveryAddress", JSON.stringify(this.addressList[index]));
    const subTotal = sessionStorage.getItem("subTotal");
    if (subTotal) {
      this.http.get(`https://secret-crag-27299.herokuapp.com/stripe?amount=${JSON.parse(subTotal)}`).subscribe(
        (res: any) => {
          console.log(res);
          this._globalSerive.stripe.redirectToCheckout({
            sessionId: res.id
          }).then(function (result: any) {
            console.log(result);
          });
        }
      )
    }
  }
  editAddress(index: number) {
    this.router.navigate([index], { relativeTo: this.route })
  }
  deleteAddress(index: number) {
    this.addressList.splice(index, 1);
    this._globalSerive.deleteAddress(this.addressList);
  }

}
