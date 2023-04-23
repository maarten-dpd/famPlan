import {Injectable} from '@angular/core';
import {Color, Label, Type} from '../../datatypes/label';
import {RecipeService} from './recipe.service';
import {ActivityService} from './activity.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  #labels: Label[] = [];
  #id = 0;

  constructor(private recepyService: RecipeService, private activityService: ActivityService) {
    this.#labels.push({name: 'eenvoudig', color: Color.danger, id: 0, type: Type.recipe});
    this.#labels.push({name: 'gezond', color: Color.primary, id: 1, type: Type.recipe});
    this.#labels.push({name: 'Werk', color: Color.secondary, id: 2, type:Type.activity});
    this.#labels.push({name: 'Plezant voor iedereen', color: Color.success, id:3,type: Type.activity})

    this.#id = 4;
  }

  //crud operation methods
  deleteLabel(id: number): void {
    this.#labels = this.#labels.filter(l => l.id !== id);
    this.recepyService.deleteLabelFromRecipe(id);
    this.activityService.deleteLabelFromActivity(id);
  }
  createLabel(name: string, color: Color): void {
    this.#labels.push({
      name,
      color,
      id: this.#id
    });
    this.#id++;
  }

  //get data methods
  getAllLabels(): Label[] {
    return this.#labels;
  }
  getLabelsByType(type: string) {
    return this.#labels.filter(l=>l.type === type)
  }

  //misc methods

  //methods for later use
  /*getLabelById(id: number): Label | undefined {
    return this.getAllLabels().find(l => l.id === id);
  }*/
}
