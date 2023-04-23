import {Injectable} from '@angular/core';
import {Recipe} from '../../datatypes/recipe';
import {Label} from '../../datatypes/label';
import {UUID} from 'angular2-uuid';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  #recipeList: Recipe[] = [];

  constructor() {
    this.newRecipe('recipe 1',['100 gr boter', '2 kilo aardappelen'],
      30,30,['schil de aardappelen', 'kook in een pot met ruim water voor 20 minuten', 'giet af', 'bak de aardappelen 10 minuten in de boter']
    ,'gebakken aardappelen')
    this.newRecipe('recipe 2',['0.5liter frit vet', '2 kilo aardappelen', '2 grote biefstukken', '150 gr boter'],
      20,25,['schil de aardappelen', 'snijd ze in frietjes',
        'kook in een pot met ruim water voor 20 minuten','maak een koekenpan super warm','bak de biefstuk aan beide kanten','giet de aardappelen af', 'frituur de aardappelen 5 minuten']
      ,'patatfriet')
  }

  getAllRecepies(): Recipe[] {
    return this.#recipeList ;
  }

  //get recepyBy methodes zijn voor in de toekomst een filter op recepten te bouwen
  getRecipeById(id: string): Recipe | undefined {
    return this.#recipeList.find(r => r.id === id);
  }
  getRecipeByName(name: string): Recipe[] {
    return this.#recipeList.filter(r => r.name === name);
  }

 /* getRecipeByTotalDuration(duration: number): Recipe | undefined {
    return this.#recipeList.find(r => r.prepTime + r.cookingTime === duration);
  }*/
 /* getRecipeByLabel(labelId: number) {
    return this.#recipeList.filter(r => r.labels.some(l => l.id === labelId));
  }*/

  deleteLabelFromRecipe(labelId: number) {
    this.#recipeList.forEach(r => r.labels = r.labels.filter(l => l.id !== labelId));
  }

  newRecipe(name: string, ingredients: string[],prepTime: number, cookingTime: number,
            instructions:string[], description: string, labels: Label[] = [],photoUrl?:string): void {
    this.#recipeList.push({
      name,
      id: UUID.UUID(),
      ingredients,
      prepTime,
      cookingTime,
      instructions,
      description,
      labels,
      photoUrl
    });

  }

  updateRecipe(updatedRecipe: {
    instructions: string[];
    photoUrl: string | undefined;
    name: string;
    description: string;
    ingredients: string[];
    id: string | null;
    cookingTime: number;
    prepTime: number;
    labels: Label[]
  }): void {
    const recipe = this.#recipeList.find(r => r.id === updatedRecipe.id);
    if (recipe === undefined) {
      console.error('Trying to update a nonexistent recipe.');
      return;
    }
    Object.assign(recipe, updatedRecipe);
  }

  deleteRecipe(id: string): void {
    this.#recipeList = this.#recipeList.filter(r => r.id !== id);
  }

  getNumberOfRecipes() {
    return this.#recipeList.length;
  }

}