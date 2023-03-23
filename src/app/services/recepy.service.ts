import {Injectable} from '@angular/core';
import {Recepy} from '../../datatypes/recepy';
import {Label} from '../../datatypes/label';


@Injectable({
  providedIn: 'root'
})
export class RecepyService {

  #recepyList: Recepy[] = [];
  #id = 0;

  constructor() {

  }


  getAllRecepies(): Recepy[] {
    return this.#recepyList ;
  }
  getRecepyById(id: number): Recepy | undefined {
    return this.#recepyList.find(r => r.id === id);
  }
  getRecepyByName(name: string): Recepy | undefined {
    return this.#recepyList.find(r => r.name === name);
  }
  getRecepyByTotalDuration(duration: number): Recepy | undefined {
    return this.#recepyList.find(r => r.prepTime + r.cookingTime === duration);
  }
  /* methode toevoegen om recepten te filteren op label*/

  deleteLabelFromRecepy(labelId: number) {
    this.#recepyList.forEach(r => r.labels = r.labels.filter(l => l.id !== labelId));
  }
  getRecepiesByLabel(labelId: number) {
    return this.#recepyList.filter(r => r.labels.some(l => l.id === labelId));
  }
  newRecepy(name: string, ingredients: string[],prepTime: number, cookingTime: number,steps:string[], description: string, labels: Label[] = []): void {
    this.#recepyList.push({
      name,
      id: this.#id,
      ingredients,
      prepTime,
      cookingTime,
      steps,
      description,
      labels
    });
    this.#id++;
  }
  updateRecepy(updatedRecepy: Recepy): void {
    const recepy = this.#recepyList.find(r => r.id === updatedRecepy.id);
    if (recepy === undefined) {
      console.error('Trying to update a nonexistent recepy.');
      return;
    }

    Object.assign(recepy, updatedRecepy);
  }
  deleteRecepy(id: number): void {
    this.#recepyList = this.#recepyList.filter(r => r.id !== id);
  }

}
