import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { CarInsuranceService } from '../services/car-insurance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss']
})
export class ChoosePlanComponent implements OnInit{
  insuranceData: any;
  planInfo:any;
  selectedPlan:string="";
  selectedPlanInfo:any;
  addOnCoverageList:any;
  totalGST:number=0;

  constructor(private http:HttpService,private router:Router,private CarInsSVC:CarInsuranceService){
    this.insuranceData=this.CarInsSVC.carInsuranceModal;
  }
  ngOnInit(): void {
    this.getEligiblePlan();
    this.calculateTotalNetPremium();
  }
  calculateTotalNetPremium(){
    if(this.insuranceData.selectedPlan.costCoverage.netPremium){
     this.totalGST=Math.floor(this.insuranceData.selectedPlan.costCoverage.netPremium*0.18);
     if(this.totalGST){
         this.insuranceData.selectedPlan.costCoverage.gst=this.totalGST;
         this.insuranceData.selectedPlan.costCoverage.totalAmount=
        Number(this.insuranceData.selectedPlan.costCoverage.netPremium+this.insuranceData.selectedPlan.costCoverage.gst)
     }
    }
  }
  getEligiblePlan(){
    this.http.getDataFromServer("get-eligible-plan").subscribe((el:any)=>{
      if(el instanceof Object ){
     
      this.planInfo=el;
      this.selectedPlan=el.plans[0].planName;
      this.setPlan(this.selectedPlan);
   }
   console.log("planInfo",this.planInfo);
   })
  }
  setPlan(plan:string){
    this.selectedPlan=plan;
    this.insuranceData.selectedPlan.planName = plan ;
    //selected plan Info
    this.selectedPlanInfo=this.planInfo.plans.filter((el:any)=>el.planName==plan)[0];
    if(this.selectedPlanInfo && this.selectedPlanInfo.contract !=null && this.selectedPlanInfo.contract.coverages.length>0)
    {
      let addOnList=this.selectedPlanInfo.contract.coverages.filter((obj:any)=>obj.coverType==='ADDONS');
      this.addOnCoverageList = JSON.parse(JSON.stringify(addOnList));
      console.log("addOn",this.addOnCoverageList);
    }
    this.setCostDetails(this.selectedPlanInfo);
  }
  setCostDetails(planObj:any){
      // setting to default value 
  this.insuranceData.selectedPlan.costCoverage.netPremium = 0 ;
  this.insuranceData.selectedPlan.costCoverage.ownDamagePremium = 0 ;
  this.insuranceData.selectedPlan.costCoverage.ncbDiscount = 0 ;
  this.insuranceData.selectedPlan.costCoverage.thirdPartyPremium = 0 ;
  this.insuranceData.selectedPlan.costCoverage.addOnsPremium = 0 ;

    //extracting own damage coverage and calculating gst
      let ownCoverage=planObj.contract.coverages.filter((el:any)=>(el.coverType==="OWN_DAMAGE"))[0];
      if(ownCoverage){
        this.insuranceData.selectedPlan.costCoverage.ownDamagePremium=ownCoverage.netPremium;
        this.insuranceData.selectedPlan.costCoverage.netPremium+=Number(ownCoverage.netPremium);
        // this.insuranceData.selectedPlan.costCoverage.gst=this.totalGST;
        //  this.insuranceData.selectedPlan.costCoverage.totalAmount=Number(this.insuranceData.selectedPlan.costCoverage.netPremium+this.insuranceData.selectedPlan.costCoverage.gst)
      }

      //Extracting Third Party Coverage
      let thirdPartyCoverage=planObj.contract.coverages.filter((el:any)=>(el.coverType==="THIRD_PARTY"))[0];
      if(thirdPartyCoverage){
        this.insuranceData.selectedPlan.costCoverage.thirdPartyPremium=thirdPartyCoverage.netPremium;
        this.insuranceData.selectedPlan.costCoverage.netPremium+=Number(thirdPartyCoverage.netPremium);
      }

      
      

      //Calculating Total Discounts
      if(planObj.discounts.otherDiscounts && planObj.discounts.otherDiscounts.length>0){
        var totalDiscount=0;
        totalDiscount=planObj.discounts.otherDiscounts.reduce((acc:any,a2:any)=>(acc+Number(a2.discountAmount)),0);
        if(totalDiscount){
           this.insuranceData.selectedPlan.costCoverage.ncbDiscount=totalDiscount;
           this.insuranceData.selectedPlan.costCoverage.netPremium-=totalDiscount;
        }

      }
      this.CarInsSVC.sendTotalPremium(this.insuranceData.selectedPlan.costCoverage.netPremium);

  }

  calculateAddOnCoverage(flag:boolean,index:number){
  const netPremium=this.addOnCoverageList[0]?.subCovers[index].netPremium
  if(flag){
    this.insuranceData.selectedPlan.costCoverage.addOnsPremium+=Number(netPremium);
    this.insuranceData.selectedPlan.costCoverage.netPremium+=Number(netPremium);
    
  }
  else{
    this.insuranceData.selectedPlan.costCoverage.addOnsPremium-=Number(netPremium);
    this.insuranceData.selectedPlan.costCoverage.netPremium-=Number(netPremium);
  }
  this.CarInsSVC.sendTotalPremium(this.insuranceData.selectedPlan.costCoverage.netPremium);
  this.calculateTotalNetPremium();
}

}
