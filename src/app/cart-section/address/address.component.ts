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
    this._globalSerive.getAddress('NuFgoUkCLaVgsyXYF2aPztjkRPc2').subscribe(
      (res: any) => this.addressList = res
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
    this._globalSerive.deleteAddress('NuFgoUkCLaVgsyXYF2aPztjkRPc2', this.addressList)
  }

}
