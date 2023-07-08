import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FilterPipe } from './Pipes/filter.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent ,
    FilterPipe
 ]
})
export class SharedModule { }
