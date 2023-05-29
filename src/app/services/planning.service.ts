import { Injectable } from '@angular/core';
import {RecipeService} from './recipe.service';
import {PlannedMenu} from '../../datatypes/plannedMenu';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference, deleteDoc,
  doc,
  DocumentReference,
  Firestore, query, setDoc, updateDoc
} from '@angular/fire/firestore';
import {firstValueFrom} from 'rxjs';
import {FamilyService} from './family.service';
@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  dateForDetail:Date=new Date();
  recipes= firstValueFrom(this.recipeService.getAllRecepies())
  constructor(public recipeService:RecipeService,
              private firestore:Firestore,
              public familyService:FamilyService) {
  }

//crud operations
  async createPlannedMenu(recipeId:string, date: string){
    if(this.familyService.currentFamilyId){
      const newPlannedMenu={
        date: date,
        recipeId: recipeId,
        id: '',
        familyId: this.familyService.currentFamilyId
      };
      const docRef = await addDoc(
        this.#getCollectionRef<PlannedMenu>('plannedMenus'),
        newPlannedMenu
      );
      newPlannedMenu.id=docRef.id
      await setDoc(docRef, newPlannedMenu)
    }
    else{
      console.log('no family id provided');
      //change to information modal
    }
  }
  async updatePlannedMenu(id: string, plannedMenu: PlannedMenu){
    await updateDoc(this.#getDocumentRef('plannedMenus',id), plannedMenu)
  }
  async deletePlannedMenu(id: string){
    await deleteDoc(this.#getDocumentRef('plannedMenus', id));
  }

//get data methods
  getAllPlannedMenusForFamily() {
      return collectionData<PlannedMenu>(
        query<PlannedMenu>(
          this.#getCollectionRef('plannedMenus'),
        ),
        {idField: 'id'}
      );
  }

//Misc methods
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }
  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<T>;
  }

}
