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
  Firestore, query, setDoc, updateDoc, where
} from '@angular/fire/firestore';
import {firstValueFrom} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  dateForDetail:Date=new Date();
  recipes= firstValueFrom(this.recipeService.getAllRecepies())
  constructor(public recipeService:RecipeService, private firestore:Firestore) {
  }
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }
  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<T>;
  }
  //crud operations
  async createPlannedMenu(recipeId:string, date: string){
    const newPlannedMenu={
      date: date,
      recipeId: recipeId,
      id: '',
    };
    const docRef = await addDoc(
      this.#getCollectionRef<PlannedMenu>('plannedMenus'),
      newPlannedMenu
    );
    newPlannedMenu.id=docRef.id
    await setDoc(docRef, newPlannedMenu)

  }
  async updatePlannedMenu(id: string, plannedMenu: PlannedMenu){
    await updateDoc(this.#getDocumentRef('plannedMenus',id), plannedMenu)
  }
  async deletePlannedMenu(id: string){
    await deleteDoc(this.#getDocumentRef('plannedMenus', id));
  }

  //get data methods
  getAllPlannedMenus() {
    return collectionData<PlannedMenu>(
      query<PlannedMenu>(
        this.#getCollectionRef('plannedMenus'),
      ),
      {idField: 'id'}
    );
  }
  getMenuForDate(date: string) {
    const startDate = date.substring(0,15);
    return collectionData<PlannedMenu>(
      query<PlannedMenu>(
        this.#getCollectionRef('plannedMenus'),
        where ('date', '>=',startDate)
          ,where('date','<',startDate+'\uffff')
      ),
      {idField: 'id'}
    );
  }
  menuIsPlannedForDate(date: string) {
    return !!this.getPlannedMenuName(date);
  }
  getPlannedMenuName(recipeId: string) {
    this.recipes.then(res=>{

      }
    )

    return 'no recipe found'
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
  //Misc methods
  setDateForDetail(date: Date){
    this.dateForDetail = date;
  }
  isARecipePlannedForToday(r: Recipe, dateForDetail: Date) {
    if(!this.getPlannedMenu(dateForDetail) || !this.getMenuForDate(dateForDetail.toString())){
      return false;
    }
    if(!r){return false;}
    if(this.getMenuForDate(dateForDetail.toString()) && this.getPlannedMenu(dateForDetail)?.id === r.id){
      return true;
    }
    return false;
  }


  getRecipeName(recipeId: string) {
    let recipeName: string = ''
    this.recipes.then(
      res=> res.forEach(r=> {
        if (r.id === recipeId) {
         recipeName=r.name
        }
      })
    ).then(()=> {
        return recipeName;
      }
    )
  }
}
