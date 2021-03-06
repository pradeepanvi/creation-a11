import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-cards',
  templateUrl: './upload-cards.component.html',
  styleUrls: ['./upload-cards.component.scss']
})
export class UploadCardsComponent implements OnInit {
  cardForm = this.fb.group({});
  cardItemsArray = new FormArray([])

  //For files
  logoFileToUpload: any;
  logoUrl: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  initCard(empPhoto = '', empName = '', empDesignation = "", empCode = "", empDOB = "", empMobile = "", empEMobile = "", empBG = "") {
    return this.fb.group({
      empPhoto: empPhoto,
      empName: empName,
      empDesignation: empDesignation,
      empCode: empCode,
      empDOB: empDOB,
      empMobile: empMobile,
      empEMobile: empEMobile,
      empBG: empBG
    })
  }
  addCard() {
    this.cardItemsArray.push(this.initCard());
  }
  removeCard(index: any) {
    this.cardItemsArray.removeAt(index);
  }

  private initForm() {
    this.cardForm = this.fb.group({
      companyName: this.fb.control(''),
      companyLogo: this.fb.control(''),
      companyAddress: this.fb.control(''),
      employeeDetails: this.cardItemsArray
    })
  }
  onSubmit() {
    console.log(this.cardForm.value)
  }

  handleLogoFileInput(file: FileList, formControl: string) {
    this.logoFileToUpload = file.item(0);

    //Show image preview
    let render = new FileReader();
    render.onload = (event: any) => {
      this.logoUrl = event.target.result;
      this.cardForm.controls[formControl].setValue(this.logoUrl)
    }
    render.readAsDataURL(this.logoFileToUpload);
    console.log(render);
  }

  handleEmpPhotoInput(file: FileList, formControl: string, arrayPosition: number) {
    const photoFileToUpload: any = file.item(0);

    //Show image preview
    const render = new FileReader();
    render.onload = (event: any) => {
      const photoUrl = event.target.result;
      console.log(this.cardItemsArray.controls[arrayPosition].controls[formControl].setValue(photoUrl));
      // console.log(photoUrl);
      // console.log(formControl);
      // console.log(arrayPosition);
      // console.log(this.cardItemsArray);
    }
    render.readAsDataURL(photoFileToUpload);
    console.log(render);
  }

}
