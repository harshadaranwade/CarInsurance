import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarInsuranceRoutingModule } from './car-insurance-routing.module';
import { CarInsuranceComponent } from './car-insurance.component';
import { SelectBrandComponent } from './select-brand/select-brand.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectVariantComponent } from './select-variant/select-variant.component';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { SharedModule } from '../shared/shared.module';
import { RegistartionDetailsComponent } from './registartion-details/registartion-details.component';
import { CoreModule } from '../core/core.module';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import{MatSlideToggleModule} from '@angular/material/slide-toggle'


@NgModule({
  declarations: [
    CarInsuranceComponent,
    SelectBrandComponent,
    InsuranceDetailsComponent,
    SelectVariantComponent,
    SelectModalComponent,
    RegistartionDetailsComponent,
    ChoosePlanComponent,
    PersonalDetailsComponent,
   
  ],
  imports: [
    CommonModule,
    CarInsuranceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSlideToggleModule
    
    
  ]
})
export class CarInsuranceModule { }
