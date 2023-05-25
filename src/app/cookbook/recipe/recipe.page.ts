import {Component, OnInit} from '@angular/core';
import {ActionSheetController, ModalController, NavController} from '@ionic/angular';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {LabelService} from '../../services/label.service';
import {Label} from '../../../datatypes/label';
import {PhotoService} from '../../services/photo.service';
import {StringInputModalPageComponent} from '../../shared/string-input-modal-page/string-input-modal-page.component';
import {Recipe} from '../../../datatypes/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  recipeName: string = '';
  recipePhotoUrl: string | undefined = '';
  prepTime: number = 0;
  cookingTime: number = 0;
  description: string = '';
  labels= this.labelService.getLabelsByType('recipe');
  selectedLabels: Label[] = [];
  ingredients: string[] = [];
  instructions: string[] =[];
  id: string | null ='';
  fromMenuSelector: string | null = '';

  constructor(public navController: NavController, public recipeService: RecipeService,
              public activatedRoute: ActivatedRoute, public labelService: LabelService,
              public photoService: PhotoService, private actionSheetCtrl: ActionSheetController,
              private modalController: ModalController) {}
  ngOnInit() {
    this.setData();
  }
  private setData(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.activatedRoute.snapshot.paramMap.get('isFromMenuSelector')){
      this.fromMenuSelector = this.activatedRoute.snapshot.paramMap.get('isFromMenuSelector');
    }
    if (this.id === null) {
      return;
    }

    this.recipeService.getRecipeById(this.id).subscribe(recipes =>{
      if(recipes && recipes.length >0){
        const recipe = recipes[0];
        this.recipeName = recipe.name;
        this.prepTime = recipe.prepTime;
        this.cookingTime = recipe.cookingTime;
        this.ingredients = recipe.ingredients;
        this.instructions = recipe.instructions;
        this.description = recipe.description;
        this.selectedLabels = recipe.labels;
        if (recipe.photoUrl != null) {
          this.recipePhotoUrl = recipe.photoUrl;
        }
      }
    }) ;


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
    this.recipeService.createRecipe(this.recipeName,this.ingredients,this.prepTime,this.cookingTime,
      this.instructions, this.description, this.selectedLabels,this.recipePhotoUrl);
  }
  private updateRecipe(): void {
    if(this.id){
      const recipeToUpdate :Recipe = {
        id: this.id,
        name: this.recipeName,
        cookingTime: this.cookingTime,
        description: this.description,
        prepTime: this.prepTime,
        ingredients: this.ingredients,
        instructions:this.instructions,
        labels: this.selectedLabels,
        photoUrl:this.recipePhotoUrl
      }
      this.recipeService.updateRecipe(this.id,recipeToUpdate);
    }
    else{
      console.log('recipe has no id field and can not be deleted')
      //replace by modal to give user warning
    }


  }
  async addIngredient() {
    await this.presentInputModal('add an ingredient','ingredient')
  }
  async addInstruction() {
    await this.presentInputModal('add an instruction', 'instruction')
  }
  async presentInputModal(requestedInput: string, type: string){
    const modal=await this.modalController.create({
      component: StringInputModalPageComponent,
      componentProps:{
        requestedInput: requestedInput,
      },
    });
    modal.onDidDismiss().then((data)=>{
      if(data.role==='cancel'){
        return;
      }
      if(data && data.data && data.data.stringToAdd){
        if(type==='ingredient'){
          this.ingredients.push(data.data.stringToAdd);
        }
        else if(type === 'instruction'){
          this.instructions.push(data.data.stringToAdd);
        }
      }
    });
    console.log('the ingredients now are');
    console.log(this.ingredients);
    return await modal.present();


  }
  putPhotoIn() {
    this.photoService.selectOrTakePhoto().then(photo =>{
      this.recipePhotoUrl = photo.dataUrl;
    })
  }
  isSelected(label: Label) {
    return this.selectedLabels.some(l=>l.id === label.id);
  }
  changeLabelSelection(label: Label) {
    if(this.isSelected(label)){
      const index = this.selectedLabels.findIndex(l=>l.id === label.id);
      if (index !== -1){
        this.selectedLabels.splice(index, 1);
      }
    } else {
      this.selectedLabels.push(label);
    }
  }
  protected readonly Number = Number;
}
