import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/global.service';
import { timer } from "rxjs";

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  addressForm = this.fb.group({});
  editMode = false;
  id: any;
  addressList = 0;

  constructor(private fb: FormBuilder, private _globalSerive: GlobalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params["id"],
          this.editMode = params["id"] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    if (this.editMode) {
      this._globalSerive.updateAddress(this.id, this.addressForm.value);
    } else {
      this._globalSerive.addAddress(this.addressList, this.addressForm.value);
      this.addressList++;
    }
    const source = timer(3000);
    source.subscribe(res => {
      this.onCancel();
    })
  }
  onCancel() {
    this.router.navigateByUrl("cart/address");
  }

  private initForm() {
    if (this.editMode) {
      const editAddress = this._globalSerive.addressList[this.id]
      this.addressForm = this.fb.group({
        name: this.fb.control(editAddress.name),
        mobile: this.fb.control(editAddress.mobile),
        pincode: this.fb.control(editAddress.pincode),
        address1: this.fb.control(editAddress.address1),
        address2: this.fb.control(editAddress.address2),
        landmark: this.fb.control(editAddress.landmark),
        city: this.fb.control(editAddress.city),
        state: this.fb.control(editAddress.state),
        addressType: this.fb.control(editAddress.addressType)
      })
    } else {
      if (this._globalSerive.addressList && this._globalSerive.addressList.length) {
        this.addressList = this._globalSerive.addressList.length;
      } else {
        this.addressList = 0;
      }
      this.addressForm = this.fb.group({
        name: this.fb.control(""),
        mobile: this.fb.control(""),
        pincode: this.fb.control(""),
        address1: this.fb.control(""),
        address2: this.fb.control(""),
        landmark: this.fb.control(""),
        city: this.fb.control(""),
        state: this.fb.control(""),
        addressType: this.fb.control("")
      })
    }

  }


}
