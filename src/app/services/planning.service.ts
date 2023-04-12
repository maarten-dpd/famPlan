import { Injectable } from '@angular/core';
import {Recipe} from '../../datatypes/recipe';
import {RecipeService} from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  dateMenuIdList = new Map<Date,string>;
  dateForDetail:Date=new Date();
  constructor(public recipeService:RecipeService) {

  }

  /*GetAllPlannedMenus() {
    return this.dateMenuIdList;
  }*/
  selectMenuForDate(recepy:Recipe, date: Date){
    this.dateMenuIdList.set(date, recepy.id);
  }
  removeMenuForDate(day: Date) {
    let menuForDay = this.dateMenuIdList.get(day);
    if (menuForDay){this.dateMenuIdList.delete(day)}
  }
  setDateForDetail(date: Date){
    this.dateForDetail = date;
  }

  menuIsPlannedForDate(date: Date) {
    return this.dateMenuIdList.has(date);
  }
  getMenuForDate(day: Date) {
    let menuForDay = this.dateMenuIdList.get(day);
    if (menuForDay){return this.recipeService.getRecipeById(menuForDay)}
    return
  }
  recipeIsPlannedForToday(r: Recipe, d: Date) {
    return this.dateMenuIdList.has(d) && this.dateMenuIdList.get(d) === r.id;

  }
}
