import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/global.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressList: any;
  constructor(private route: ActivatedRoute, private router: Router, private _globalSerive: GlobalService) { }

  ngOnInit(): void {
    this.getAddressList();
  }

  getAddressList() {
    const addressListData = sessionStorage.getItem("addressList");
    if (addressListData) {
      this.addressList = JSON.parse(addressListData);
    } else {
      this.getFirebaseAddressList();
    }
  }

  getFirebaseAddressList() {
    this._globalSerive.getAddress().subscribe(
      (res: any) => {
        sessionStorage.setItem("addressList", JSON.stringify(res));
        this.addressList = res
      }
    )
  }

  addNewAddress() {
    this.router.navigate(['../new-address'], { relativeTo: this.route })
  }

  setAddress(index: number) {
    console.log({ address: this.addressList[index] })
  }
  editAddress(index: number) {
    this.router.navigate([index], { relativeTo: this.route })
  }
  deleteAddress(index: number) {
    this.addressList.splice(index, 1);
    this._globalSerive.deleteAddress(this.addressList);
    sessionStorage.setItem("addressList", JSON.stringify(this.addressList));
  }

}
