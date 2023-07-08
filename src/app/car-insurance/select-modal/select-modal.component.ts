import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { CarInsuranceRoutingModule } from '../car-insurance-routing.module';
import { CarInsuranceService } from '../services/car-insurance.service';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalComponent implements OnInit{
  selectedBrand:string|null=null;
  modalList:any[]=[];
  insuranceData:any;
  constructor(private activatedRoute:ActivatedRoute,private http:HttpService,private carInsSVC:CarInsuranceService,
    private router:Router){
     this.selectedBrand=this.activatedRoute.snapshot.paramMap.get('brandName');
    this.insuranceData=this.carInsSVC.carInsuranceModal;
  }
  ngOnInit(): void {
   this.getModalList();
  }
  getModalList(){
    const endPoint='brands?'+'brandName='+this.selectedBrand;
    this.http.getDataFromServer(endPoint).subscribe((resp:any)=>{
      if(resp&&resp.length>0){
        this.modalList=resp[0].models;
      }
        //console.log(resp);
    })
  }
  selectModal(model:any){
     this.insuranceData.modelName=model;
     this.router.navigate(['/car-insurance/select-variant',model]);
  }
}
