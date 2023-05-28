import {Injectable} from '@angular/core';
import {Recipe} from '../../datatypes/recipe';
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
  }

  //crud operations
  async createRecipe(name: string, ingredients: string[], prepTime: number, cookingTime: number,
                     instructions:string[], description: string, selectedLabels: string[] = [], photoUrl?:string) {
    const newRecipe ={
      name,
      id: '',
      ingredients,
      prepTime,
      cookingTime,
      instructions,
      description,
      selectedLabels,
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

  //get data methods
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
  getRecipesByFamilyId() {
    return collectionData<Recipe>(
      query<Recipe>(
        this.#getCollectionRef('recipes'),
        where('familyId','==', this.familyService.currentFamilyId)
      ),
      {idField: 'id'}
    ) ;
  }

  //Misc methods
  labelIsInUse(id: string) {
    const recipes = this.getAllRecepies();
    let result = false
    recipes.subscribe(recipes =>{
      for (const recipe of recipes){
        const labelUsed = recipe.selectedLabels.some(label =>label === id);
        if(labelUsed){
          result = true;
        }
      }
      }
    )
    return result;
  }
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }
  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<T>;
  }
}
