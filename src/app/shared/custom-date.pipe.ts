
import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {

  override transform(value: any, type: any): any {
    switch(type){
      case 'full':{
        return super.transform(value, "EEEE d MMM y");
      }
      case 'dayMonth':{
        return super.transform(value, "d MMMM")
      }
      case 'day':{
        return super.transform(value, "d")
      }
      case 'dayMonthShort' : {
        return super.transform(value, 'd/M')
      }
    }

    return super.transform(value, "EEEE d/MMM/y")

  }

}
