import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from 'src/app/shared/global.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  addressForm = this.fb.group({});
  editMode = false;
  id: any;

  constructor(private fb: FormBuilder, private _globalSerive: GlobalService, private route: ActivatedRoute) { }

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
      this._globalSerive.updateAddress('NuFgoUkCLaVgsyXYF2aPztjkRPc2', this.id, this.addressForm.value);
    } else {
      this._globalSerive.addAddress('NuFgoUkCLaVgsyXYF2aPztjkRPc2', this.addressForm.value);
    }
  }

  private initForm() {
    if (this.editMode) {
      this._globalSerive.getAddress('NuFgoUkCLaVgsyXYF2aPztjkRPc2').subscribe(
        (res: any) => {
          const editAddress = res[this.id];
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
        }
      )
    } else {
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
