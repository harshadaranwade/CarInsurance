import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarInsuranceService } from '../services/car-insurance.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs=pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit{
  personalDetails!:FormGroup;
  insuranceData:any;
  ownershipDetailsCompleted:boolean=false;
  isLoan!:boolean;

  constructor(private carInsSvc:CarInsuranceService,private fb:FormBuilder){
    this.insuranceData = this.carInsSvc.carInsuranceModal;
  }
  ngOnInit(): void {
    this.createForm();
   
  }

 
  createForm(){
    this.personalDetails = this.fb.group({
      "ownerdetails":this.fb.group({
          "fullName":['',[Validators.required]],
          "pincode":['',[Validators.required]],
          "emailAddress":['',[Validators.required]],
          "mobileNumber":['',[Validators.required]],
          "sendUpdatesViaWhatsApp":[false],
          "address":['',[]],
          //"nomineeName":['',[Validators.required]],
        //  "nomineeRelationShip":['']
      }),
      "cardetails":this.fb.group({
        "regNumber":[''],
        "chasisNumber":['',[Validators.required]],
        "engineNumber":['',[]],
        "fastTagNumber":[''],
        "isCarLoanTaken":[false],
        "bankLoanProvider":['']
      })
    })
  }
  saveData(){
    console.log(this.personalDetails.value);
    this.insuranceData.personaldetails.ownerdetails.fullName=this.personalDetails.value['ownerdetails']['fullName'];
    this.insuranceData.personaldetails.ownerdetails.pinCode=this.personalDetails.value['ownerdetails']['pincode'];
    this.insuranceData.personaldetails.ownerdetails.emailAddress=this.personalDetails.value['ownerdetails']['emailAddress'];
    this.insuranceData.personaldetails.ownerdetails.mobileNumber=this.personalDetails.value['ownerdetails']['mobileNumber'];
    this.insuranceData.personaldetails.cardetails.regNumber=this.personalDetails.value['cardetails']['regNumber'];
    this.insuranceData.personaldetails.cardetails.chasisNumber=this.personalDetails.value['cardetails']['chasisNumber'];
    this.insuranceData.personaldetails.cardetails.engineNumber=this.personalDetails.value['cardetails']['engineNumber'];
    this.insuranceData.personaldetails.cardetails.fastTagNumber=this.personalDetails.value['cardetails']['fastTagNumber'];

    this.generatePdf();
  }


  generatePdf(){
    let docDefinition:any={
      content:[
        { text: 'Car Insurance Receipt', style: 'header', margin: [0, 0, 30, 0] },

        { text: 'Registration Details:', style: 'subheader', margin: [0, 10] },
        { text: `Brand Name: ${this.insuranceData.brandName}`, style: 'label', margin: [0, 5] },
        { text: `Model Name: ${this.insuranceData.modelName}`, style: 'label', margin: [0, 5] },
        { text: `Variant Name: ${this.insuranceData.variantName}`, style: 'label', margin: [0, 5] },
        { text: `Year: ${this.insuranceData.regDetails.regYear}`, style: 'label', margin: [0, 5] },
        { text: `Month: ${this.insuranceData.regDetails.regMonth}`, style: 'label', margin: [0, 5] },
        { text: `City: ${this.insuranceData.regDetails.regCity}`, style: 'label', margin: [0, 5] },
        
        { text: 'Selected Plan Details:', style: 'subheader', margin: [0, 10] },
        { text: `Plan Name: ${this.insuranceData.selectedPlan.planName}`, style: 'label' },

        { text: 'Personal Details', style: 'header', margin: [0, 10] },
        { text: 'Owner Details:', style: 'subheader', margin: [0, 5] },

        { text: `Full Name: ${this.insuranceData['personaldetails']['ownerdetails']['fullName']}`, style: 'label', margin: [0, 5] },
        { text: `Pin Code: ${this.insuranceData['personaldetails']['ownerdetails']['pinCode']}`, style: 'label', margin: [0, 5] },
        { text: `Email Address: ${this.insuranceData['personaldetails']['ownerdetails']['emailAddress']}`, style: 'label', margin: [0, 5] },
        { text: `Mobile Number: ${this.insuranceData['personaldetails']['ownerdetails']['mobileNumber']}`, style: 'label', margin: [0, 5] },


        { text: 'Car Details:', style: 'subheader', margin: [0, 10] },
        {text : `Registration Number : ${this.insuranceData['personaldetails']['cardetails']['regNumber']}`, style: 'label', margin: [0, 5]},
        {text : `Chasis Number : ${this.insuranceData['personaldetails']['cardetails']['chasisNumber']}`, style: 'label', margin: [0, 5]},
        {text : `Engine Number : ${this.insuranceData['personaldetails']['cardetails']['engineNumber']}`, style: 'label', margin: [0, 5]},

        { text: 'Payment Details:', style: 'header', margin: [0, 10] },
        {text : `Total Cost : ${this.insuranceData['selectedPlan']['costCoverage']['totalAmount']}`, style: 'label', margin: [0, 5]},
        // this.insuranceData.selectedPlan.costCoverage.totalAmount
      ],
      
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          color: '#002D62',
          alignment: 'center',
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 5]
        },
        label: {
          bold: true,
          color: 'grey'
        },

      }
    };
    pdfMake.createPdf(docDefinition).download('sample.pdf');
  }
}
// toggleDropdowns(){
  // this.regForm.enabled ? this.regForm.disable() : this.regForm.enable();
  // if(this.regForm.disabled){
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear().toString();
  //   const month = this.getMonthName(currentDate.getMonth());
  //   this.regForm.get('year')?.patchValue(year)
  //   this.regForm.get('month')?.patchValue(month);
  // }else{
  //   this.regForm.reset();
  // }
