import {Injectable} from '@angular/core';
import {Recipe} from '../../datatypes/recipe';
import {Label} from '../../datatypes/label';
import {UUID} from 'angular2-uuid';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference, deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  query, setDoc, updateDoc, where
} from '@angular/fire/firestore';
import {FamilyService} from './family.service';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private firestore:Firestore, private familyService:FamilyService) {
    // this.newRecipe('recipe 1',['100 gr boter', '2 kilo aardappelen'],
    //   30,30,['schil de aardappelen', 'kook in een pot met ruim water voor 20 minuten', 'giet af', 'bak de aardappelen 10 minuten in de boter']
    // ,'gebakken aardappelen')
    // this.newRecipe('recipe 2',['0.5liter frit vet', '2 kilo aardappelen', '2 grote biefstukken', '150 gr boter'],
    //   20,25,['schil de aardappelen', 'snijd ze in frietjes',
    //     'kook in een pot met ruim water voor 20 minuten','maak een koekenpan super warm','bak de biefstuk aan beide kanten','giet de aardappelen af', 'frituur de aardappelen 5 minuten']
    //   ,'patatfriet')
  }

  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }
  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<T>;
  }
  getAllRecepies() {
    return collectionData<Recipe>(
      query<Recipe>(
        this.#getCollectionRef('recipes')
      ),
      {idField: 'id'}
    ) ;
  }
  getRecipeById(id: string){
    return collectionData<Recipe>(
      query<Recipe>(
        this.#getCollectionRef('recipes'),
        where('id','==',id)
      ),
      {idField: 'id'}
    );
  }
  getRecipeByName(name: string)  {
    return collectionData<Recipe>(
      query<Recipe>(
        this.#getCollectionRef('recipes'),
        where('name','==',name)
      ),
      {idField: 'id'}
    );
  }
  async newRecipe(name: string, ingredients: string[],prepTime: number, cookingTime: number,
            instructions:string[], description: string, labels: Label[] = [], photoUrl?:string) {
    const newRecipe ={
      name,
      id: '',
      ingredients,
      prepTime,
      cookingTime,
      instructions,
      description,
      labels,
      photoUrl,
      familyId: this.familyService.currentFamilyId
    };
    const docRef=await addDoc(
      this.#getCollectionRef<Recipe>('recipes'),
      newRecipe
    );
    newRecipe.id=docRef.id
    await setDoc(docRef, newRecipe)

  }
 async updateRecipe(id: string, recipe: Recipe){
    await updateDoc(this.#getDocumentRef('recipes',id), recipe)
 }
  async deleteRecipe(id: string){
    await deleteDoc(this.#getDocumentRef('recipes', id));
  }
  getNumberOfRecipes() {
    const recipes = this.getAllRecepies();
    let numberOfRecipes = 0;
    recipes.subscribe(recipes =>{
      for(const recipe of recipes){
        numberOfRecipes++;
      }
    })
    return numberOfRecipes;
  }
  labelIsInUse(id: string) {
    const recipes = this.getAllRecepies();
    let result = false
    recipes.subscribe(recipes =>{
      for (const recipe of recipes){
        const labelUsed = recipe.labels.some(label =>label.id === id);
        if(labelUsed){
          result = true;
        }
      }
      }
    )
    return result;
  }
  getRecipesByFamilyId() {
    return collectionData<Recipe>(
      query<Recipe>(
        this.#getCollectionRef('recipes'),
        where('familyId','==', this.familyService.currentFamilyId)
      ),
      {idField: 'id'}
    ) ;
  }
}
