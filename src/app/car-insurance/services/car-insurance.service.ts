import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//CarInsuranceService
export class CarInsuranceService {
  totalPremium = new BehaviorSubject<Number>(0);
  totalPremiumObs$ = this.totalPremium.asObservable();
  carInsuranceModal:any={
    "brandName":"",
    "modelName":"",
    "variantName":"",
   
    "selectedPlan":{
      "planName":"",
      "planInfo":{},
      "selectedIdv":0, 
      "costCoverage":{
       "netPremium":0,
       "thirdPartyPremium":0,
       "ownDamagePremium":0,
       "addOnsPremium":0,
       "ncbDiscount":0,
       "gst":0,
       "totalAmount":0
      }
   },
   "regDetails":{
    "regYear":"",
    "regMonth":"",
    "regCity":"",
    "thirdPartyExpiry":"",
    "ownDamageExpiryDate":""
   },
   "personaldetails":{
     "ownerdetails":{
      "fullName":"",
      "pinCode":"",
      "emailAddress":"",
      "mobileNumber":""

     },
     "cardetails":{
       "regNumber":"",
       "chasisNumber":"",
       "engineNumber":"",
       "fastTagNumber":"",
       "isCarLoan":""
     }
   }
  }
  constructor() { }
  // getCarInsuranceModal(){
    
  //   return new CarInsurance();
  // }
  sendTotalPremium(amount:number){
    this.totalPremium.next(amount);
  }
}
// export class CarInsurance{
//   brandName!:string;
//   modelName!:string;
//   variantName!:string;
//   regYear!:string;
//   regMonth!:string;
//   regCity!:string;
// }