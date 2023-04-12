import { Component } from '@angular/core';
import {FamilyService} from '../services/family.service';
import {RecipeService} from '../services/recipe.service';
import {ActivityService} from '../services/activity.service';
import {PlanningService} from '../services/planning.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  familyName: string = '';
  startDate = new Date() ;
  currentWeekDays: Date[] = [];
  weekSpansMonth: boolean = false;


  constructor(public familyService: FamilyService,public activityService: ActivityService,
              public planningService:PlanningService) {

    this.familyName = familyService.getFamilyName()
    for(let i = 0;i<7;i++){
        let result = new Date(this.startDate);
        result.setDate(result.getDate() + i);
        this.currentWeekDays.push(result);
    }
    if(this.currentWeekDays[0].getMonth() !== this.currentWeekDays[6].getMonth()){
      this.weekSpansMonth = true;
    }
  }

  changeWeek(type: string) {
    console.log('button change week pushed')
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

}
