import { Injectable } from '@angular/core';
import {Recipe} from '../../datatypes/recipe';
import {RecipeService} from './recipe.service';
import {PlannedMenu} from '../../datatypes/plannedMenu';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  #plannedMenus : PlannedMenu[] = [];

  dateForDetail:Date=new Date();
  constructor(public recipeService:RecipeService) {
    this.setMenuForDate(this.recipeService.getRecipeByName('recipe 1')[0].id,this.dateForDetail.toString())
    /*console.log(this.#plannedMenus);*/
  }

  setMenuForDate(recipeId:string, date: string){
    this.#plannedMenus.push({
      date,
      recipeId,
    })
  }
  getMenuForDate(date: string) {
    /*console.log('date passed to function:');
    console.log(date);
    console.log('substring of date passed to function');
    console.log(date.substring(0,15));

      this.#plannedMenus.forEach((item:PlannedMenu)=>{
        console.log('substring of date in plannedmenus array');
        console.log(item.date.substring(0,15));
      })*/

    return this.#plannedMenus.filter(pm => pm.date.substring(0,15) === date.substring(0,15));
  }
  removeMenuForDate(date: string) {
    this.#plannedMenus = this.#plannedMenus.filter(pm => pm.date.substring(0,15) !== date.substring(0,15))
  }
  setDateForDetail(date: Date){
    this.dateForDetail = date;
  }
  menuIsPlannedForDate(date: Date) {
    return !!this.getPlannedMenuName(date);

  }
  getPlannedMenuName(date: Date) {
    let menuId = this.getMenuForDate(date.toString());
    if(menuId.length>0){
      return this.recipeService.getRecipeById(menuId[0].recipeId)?.name;
    }
    return;
  }
  getPlannedMenu(date: Date) {
    let menuId = this.getMenuForDate(date.toString());
    if(menuId.length>0){
      return this.recipeService.getRecipeById(menuId[0].recipeId);
    }
    return;
  }
  isRecipeIsPlannedForToday(r: Recipe, dateForDetail: Date) {
    if(!this.getPlannedMenu(dateForDetail) || !this.getMenuForDate(dateForDetail.toString())){
      return false;
    }
    /*console.log('recipe =');
    console.log(r);
    console.log('date =');
    console.log(dateForDetail);
    console.log('getMenuForDate =');
    console.log(this.getMenuForDate(dateForDetail.toString()));
    console.log('getPlannedMenu =');
    console.log(this.getPlannedMenu(dateForDetail));*/
    if(!r){return false;}
    if(this.getMenuForDate(dateForDetail.toString()) && this.getPlannedMenu(dateForDetail)?.id === r.id){
      /*console.log('returned true');*/
      return true;
    }
    /*console.log('returned false');*/
    return false;
  }
}
