import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarInsuranceComponent } from './car-insurance.component';
import { SelectBrandComponent } from './select-brand/select-brand.component';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { SelectVariantComponent } from './select-variant/select-variant.component';
import { RegistartionDetailsComponent } from './registartion-details/registartion-details.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

const routes: Routes = [
  { path: '', component: CarInsuranceComponent,children:[
    { path:'',component:SelectBrandComponent},
    {path:'select-modal/:brandName',component:SelectModalComponent},
    {path:'select-variant/:modelName',component:SelectVariantComponent},
   {path:'select-brand',component:SelectBrandComponent},
   {path:'registration-details',component:RegistartionDetailsComponent},
   {path:'choose-plan',component:ChoosePlanComponent},
  //{path:'',redirectTo:'/select-brand',pathMatch:'full'}
  {path:'personal-details',component:PersonalDetailsComponent} 
]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarInsuranceRoutingModule { }
