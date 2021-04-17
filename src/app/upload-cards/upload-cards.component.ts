import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../shared/global.service';

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

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
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
    const isPreivewData = sessionStorage.getItem("uploadCardsData");
    if (isPreivewData) {
      const cardData = JSON.parse(isPreivewData);
      if (cardData.employeeDetails.length > 0) {
        cardData.employeeDetails.forEach((card: any) => {
          this.cardItemsArray.push(this.initCard(card.empPhoto, card.empName, card.empDesignation, card.empCode, card.empDOB, card.empMobile, card.empEMobile, card.empBG));
        });
      }
      this.cardForm = this.fb.group({
        companyName: this.fb.control(cardData.companyName),
        companyLogo: this.fb.control(cardData.companyLogo),
        companyAddress: this.fb.control(cardData.companyAddress),
        employeeDetails: this.cardItemsArray
      })
    } else {
      this.cardForm = this.fb.group({
        companyName: this.fb.control(''),
        companyLogo: this.fb.control(''),
        companyAddress: this.fb.control(''),
        employeeDetails: this.cardItemsArray
      })
    }

  }
  onSubmit() {
    sessionStorage.setItem("uploadCardsData", JSON.stringify(this.cardForm.value));
    this.router.navigate(["/preview-cards"], { relativeTo: this.route })
  }

  handleLogoFileInput(file: any, formControl: string) {
    console.log(file);
    this.logoFileToUpload = file.target.files ? file.target.files[0] : '';

    //Show image preview
    let render = new FileReader();
    render.onload = (event: any) => {
      this.logoUrl = event.target.result;
      this.cardForm.controls[formControl].setValue(this.logoUrl)
    }
    render.readAsDataURL(this.logoFileToUpload);
    console.log(render);
  }

  handleEmpPhotoInput(file: any, formControl: string, arrayPosition: number) {
    const photoFileToUpload: any = file.target.files ? file.target.files[0] : '';

    //Show image preview
    const render = new FileReader();
    render.onload = (event: any) => {
      const photoUrl = event.target.result;
      this.cardItemsArray.controls[arrayPosition].get(formControl)?.setValue(photoUrl);
    }
    render.readAsDataURL(photoFileToUpload);
  }

}
