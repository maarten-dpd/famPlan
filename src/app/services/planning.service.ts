import { Injectable } from '@angular/core';
import {Recipe} from '../../datatypes/recipe';
import {RecipeService} from './recipe.service';
import {PlannedMenu} from '../../datatypes/plannedMenu';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference, deleteDoc,
  doc,
  DocumentReference,
  Firestore, query, where
} from '@angular/fire/firestore';
import {UUID} from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  #plannedMenus : PlannedMenu[] = [];

  dateForDetail:Date=new Date();
  constructor(public recipeService:RecipeService, private firestore:Firestore) {
    // this.setMenuForDate(this.recipeService.getRecipeByName('recipe 1')[0].id,this.dateForDetail.toString())
    /*console.log(this.#plannedMenus);*/
  }
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }
  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<T>;
  }
  async setMenuForDate(recipeId:string, date: string){
    const newPlannedMenu={
      date: date,
      recipeId: recipeId,
      id: UUID.UUID(),
    };
    await addDoc(
      this.#getCollectionRef<PlannedMenu>('plannedMenus'),
      newPlannedMenu
    );

  }
   getMenuForDate(date: string) {
    return collectionData<PlannedMenu>(
      query<PlannedMenu>(
        this.#getCollectionRef('plannedMenus'),
        where ('date.substring(0,15)', '==',date.substring(0,15))
      ),
      {idField: 'id'}
    );
    /*console.log('date passed to function:');
    console.log(date);
    console.log('substring of date passed to function');
    console.log(date.substring(0,15));

      this.#plannedMenus.forEach((item:PlannedMenu)=>{
        console.log('substring of date in plannedmenus array');
        console.log(item.date.substring(0,15));
      })*/
  }
  async removeMenuForDate(date: string) {
    const plannedMenus = this.getMenuForDate(date);
    let idToRemove = '';
    plannedMenus.subscribe(plannedMenus =>{
        if(plannedMenus && plannedMenus.length>0){
          let plannedMenuToRemove = plannedMenus[0];
          idToRemove = plannedMenuToRemove.id;
        }
    })

    await deleteDoc(this.#getDocumentRef('plannedMenus',idToRemove))
    this.#plannedMenus = this.#plannedMenus.filter(pm => pm.date.substring(0,15) !== date.substring(0,15))
  }
  setDateForDetail(date: Date){
    this.dateForDetail = date;
  }
  menuIsPlannedForDate(date: Date) {
    return !!this.getPlannedMenuName(date);

  }
  getPlannedMenuName(date: Date) {
    let plannedMenuName = ''
    let menuId = this.getMenuForDate(date.toString());
    menuId.subscribe(menus=>{
      if(menus && menus.length >0) {
        this.recipeService.getRecipeById(menus[0].recipeId).subscribe(recipes => {
          plannedMenuName = recipes[0].name;
        })
      }
    });
    return plannedMenuName;
  }

  getPlannedMenu(date: Date) {
    let menuId = this.getMenuForDate(date.toString());
    let recipe= new Recipe({
      id : '',
      cookingTime: 0,
      description: '',
      ingredients: [],
      instructions: [],
      labels: [],
      name: '',
      photoUrl: '',
      prepTime: 0,
      familyId:'',

    });
    menuId.subscribe(menus=>{
      if(menus.length>0){
        this.recipeService.getRecipeById(menus[0].recipeId).subscribe(recipes=>{
          if(recipes.length>0){
            recipe = recipes[0];
        }
        });
      }

    })
    return recipe;
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
