import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {LabelService} from '../../services/label.service';
import {Label} from '../../../datatypes/label';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  recepyName: string = '';
  prepTime: number = 0;
  cookingTime: number = 0;
  description: string = '';
  labels= this.labelService.getAllLabels();
  selectedLabels: boolean[] = Array(this.labels.length).fill(false);
  ingredients: string[] = [];
  instructions: string[] =[];
  id: string | null ='';
  fromMenuSelector: string | null = '';

  constructor(public navController: NavController, public recipeService: RecipeService,
              public activatedRoute: ActivatedRoute, public labelService: LabelService,) {


  }
  ngOnInit() {
    this.setData();
  }
  /*back button should redirect to menu selector if page was opened from there
  * found this to do so: https://stackoverflow.com/questions/60999267/angular-query-params-as-boolean-type-not-string */
  setData(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.activatedRoute.snapshot.paramMap.get('isFromMenuSelector')){
      this.fromMenuSelector = this.activatedRoute.snapshot.paramMap.get('isFromMenuSelector');
    }


    if (this.id === null) {
      return;
    }

    const recepy = this.recipeService.getRecipeById(this.id);
    if(recepy){
      this.recepyName = recepy.name;
      this.prepTime = recepy.prepTime;
      this.cookingTime = recepy.cookingTime;
      this.ingredients = recepy.ingredients;
      this.instructions = recepy.instructions;
      this.description = recepy.description;
      this.selectedLabels = this.labels.map(l => !!recepy.labels.find(l2 => l2.id === l.id));
    }

  }

    handleCreateAndUpdate(): void {
    if (this.id) {
      this.updateRecipe();
    } else {
      this.createRecipe();
    }
    this.navController.back();
  }

  private createRecipe(): void {
    this.recipeService.newRecipe(this.recepyName,this.ingredients,this.prepTime,this.cookingTime, this.instructions, this.description, this.getSelectedLabels());
  }

  private updateRecipe(): void {
    this.recipeService.updateRecipe({
      id: this.id,
      name: this.recepyName,
      cookingTime: this.cookingTime,
      description: this.description,
      prepTime: this.prepTime,
      ingredients: this.ingredients,
      instructions:this.instructions,
      labels: this.getSelectedLabels(),
    });
  }

  private getSelectedLabels(): Label[] {
    return this.labels.filter((l, i) => this.selectedLabels[i]);
  }

}
