import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, type: string): any {
    console.log("filter Pipe");
    if(!value){
      return [];
    }
    if(type){
       value=value.filter((el:any)=>el["Fuel Type"]==type);
       return value;
    }
    else{
      return value;
    }
    
  }

}
