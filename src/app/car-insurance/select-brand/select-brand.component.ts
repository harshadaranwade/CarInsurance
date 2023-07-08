import { Component } from '@angular/core';
import { CarInsuranceService } from '../services/car-insurance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-brand',
  templateUrl: './select-brand.component.html',
  styleUrls: ['./select-brand.component.scss']
})
export class SelectBrandComponent {

brandList:any=[
  {
    "imgPath":"https://listcarbrands.com/wp-content/uploads/2017/10/Tata-Motors-Logo-1988.png",
    "brandName":"TATA"
  },
  {
    "imgPath":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQISflcMIS7RYmuQweauAD5iQvG30yxlBxPgA&usqp=CAU",
    "brandName":"KIA"
  },
  {
    "imgPath":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAlOwIvIzcEv2B_CpUiEurJD5ewtaAUnWJVQ&usqp=CAU",
    "brandName":"Maruti"
  },
  {
    "imgPath":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HxumG6qxDxKx1hguttgentDnzjH81690_Q&usqp=CAU",
    "brandName":"AUDI"
  }
]
insuranceData:any;
constructor(private carInsurance:CarInsuranceService,private router:Router){
this.insuranceData=this.carInsurance.carInsuranceModal;
}
selectBrand(name:string){
  this.insuranceData.brandName=name;
   this.router.navigate(['/car-insurance/select-modal',name]);
   
}
}
