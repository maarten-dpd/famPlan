import {Component} from '@angular/core';
import {FamilyService} from '../services/family.service';
import {ActivityService} from '../services/activity.service';
import {PlanningService} from '../services/planning.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
//attributes
  familyName: string = '';
  startDate = new Date() ;
  currentWeekDays: Date[] = [];
  weekSpansMonth: boolean = false;


//constructor
  constructor(public familyService: FamilyService,
              public activityService: ActivityService,
              public planningService:PlanningService,
              ) {

    this.familyName = familyService.getFamilyName()
    //create a week to display
    for(let i = 0;i<7;i++){
        let result = new Date(this.startDate);
        result.setDate(result.getDate() + i);
        this.currentWeekDays.push(result);
    }
    //set parameter to true if week spans two different months - this is to adapt the title
    if(this.currentWeekDays[0].getMonth() !== this.currentWeekDays[6].getMonth()){
      this.weekSpansMonth = true;
    }
  }

//operations to create the week
  getCurrentWeek(date: Date){
    for(let i = 0;i<7;i++){
      let result = new Date(date);
      result.setDate(result.getDate() + i);
      this.currentWeekDays.push(result);
    }
  }
  checkWeekSpansMonth(){
    this.weekSpansMonth = this.currentWeekDays[0].getMonth() !== this.currentWeekDays[6].getMonth();
  }

//operations to change the week
  changeWeek(type: string) {
    if (type === "next"){
      this.startDate = this.addDays(this.startDate, 7)
    }
    else if(type === "previous"){
      this.startDate = this.subtractDays(this.startDate, 7);
    }
    this.currentWeekDays.length = 0;
    this.getCurrentWeek(this.startDate)
    this.checkWeekSpansMonth();
  }
  addDays(date: Date, days: number): Date{
    date.setDate(date.getDate()+days);
    return date;
  }
  subtractDays(date: Date, days: number): Date{
    date.setDate(date.getDate()-days);
    return date;
  }

}
