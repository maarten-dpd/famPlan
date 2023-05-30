import {Component, OnInit} from '@angular/core';
import {ActionSheetController, ModalController, NavController} from '@ionic/angular';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {LabelService} from '../../services/label.service';
import {Label} from '../../../datatypes/label';
import {PhotoService} from '../../services/photo.service';
import {StringInputModalPageComponent} from '../../shared/string-input-modal-page/string-input-modal-page.component';
import {Recipe} from '../../../datatypes/recipe';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})

export class RecipePage implements OnInit {
 //attributes
  recipeName: string = '';
  prepTime: number = 0;
  cookingTime: number = 0;
  description: string = '';
  labels:Label[]=[];
  selectedLabels: string[] = [];
  ingredients: string[] = [];
  instructions: string[] =[];
  id: string | null ='';
  recipePhotoUrl: string = '';

 //constructor
  constructor(public navController: NavController,
              public recipeService: RecipeService,
              public activatedRoute: ActivatedRoute,
              public labelService: LabelService,
              public photoService: PhotoService,
              private actionSheetCtrl: ActionSheetController,
              private modalController: ModalController,
) {}

 //init/destroy/setData
  async ngOnInit() {
   await this.setData();
  }
  ngOnDestroy(){

  }
  private async setData() {

    this.labels = await firstValueFrom(this.labelService.getLabelsByType('recipe'));
    this.labels.sort((a,b)=>a.name.localeCompare(b.name));
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id === null) {
      return;
    }

    await this.recipeService.getRecipeById(this.id).subscribe(recipes =>{
      if(recipes && recipes.length >0){
        const recipe = recipes[0];
        this.recipeName = recipe.name;
        this.prepTime = recipe.prepTime;
        this.cookingTime = recipe.cookingTime;
        this.ingredients = recipe.ingredients;
        this.instructions = recipe.instructions;
        this.description = recipe.description;
        this.selectedLabels = recipe.selectedLabels;
        if(recipe.photoUrl){
          this.recipePhotoUrl = recipe.photoUrl;
        }
      }
    });
  }

 //update and create
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
      this.instructions, this.description, this.selectedLabels,this.recipePhotoUrl).then(()=>{
        console.log('recipe created')
    });
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
        selectedLabels: this.selectedLabels,
        photoUrl:this.recipePhotoUrl
      }
      this.recipeService.updateRecipe(this.id,recipeToUpdate).then(()=>{
        console.log('recipe updated')
      }).then(()=>{
        this.navController.back()
      });
    }
    else{
      console.log('recipe has no id field and can not be updated')
    }
  }

 //functionality to input ingredients/instructions
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
    return await modal.present();
  }

 //functionality to take a picture, this calls the photo service and gets a url back
  async takePictureOfFood(){
    this.photoService.getPhotoSaveInStorageReturnUrl().then((res)=>{
        if(typeof res === 'string' ) this.recipePhotoUrl = res;
    })
  }

 //functionality to handle labels
  isSelectedLabel(label: Label) {
    return this.selectedLabels.some(l=>l === label.id);
  }
  changeLabelSelection(label: Label) {
    if(this.isSelectedLabel(label)){
      const index = this.selectedLabels.findIndex(l=>l === label.id);
      if (index !== -1){
        this.selectedLabels.splice(index, 1);
      }
    } else {
      this.selectedLabels.push(label.id);
    }
  }
  protected readonly Number = Number;

}
