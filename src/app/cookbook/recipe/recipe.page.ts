import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActionSheetController, ModalController, NavController} from '@ionic/angular';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {LabelService} from '../../services/label.service';
import {Label} from '../../../datatypes/label';
import {PhotoService} from '../../services/photo.service';
import {StringInputModalPageComponent} from '../../shared/string-input-modal-page/string-input-modal-page.component';
import {Recipe} from '../../../datatypes/recipe';
import {Subscription} from 'rxjs';
import {Foto} from '../../../datatypes/foto';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  recipeName: string = '';
  recipePhotoId: string  = '';
  prepTime: number = 0;
  cookingTime: number = 0;
  description: string = '';
  #labelSub!:Subscription;
  labels:Label[]=[];
  selectedLabels: string[] = [];
  ingredients: string[] = [];
  instructions: string[] =[];
  id: string | null ='';
  fromMenuSelector: string | null = '';
  photos: Foto[]=[];
  recipePhoto?: Foto;
  recipePhotoSource: string = '';
  recipeHasPhoto:boolean=false;
  recipeImageBlob!:Blob;
  recipePhotoUrl: string = '';
  constructor(public navController: NavController,
              public recipeService: RecipeService,
              public activatedRoute: ActivatedRoute,
              public labelService: LabelService,
              public photoService: PhotoService,
              private actionSheetCtrl: ActionSheetController,
              private modalController: ModalController,
              private cdr:ChangeDetectorRef) {}
  ngOnInit() {
    this.setData();
  }
  ngOnDestroy(){
    if(this.#labelSub){
      this.#labelSub.unsubscribe();
    }
  }
  private setData(): void {
    this.#labelSub = this.labelService.getLabelsByType('recipe').subscribe(res=>{
      this.labels = res;
      this.labels.sort();
      this.cdr.detectChanges();
    })
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
        this.selectedLabels = recipe.selectedLabels;
        if(recipe.photoUrl){
          this.recipePhotoUrl = recipe.photoUrl;
        }
      }
    });
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
      console.log(recipeToUpdate)
      this.recipeService.updateRecipe(this.id,recipeToUpdate).then(()=>{
        console.log('recipe updated')
      }).then(()=>{
        this.navController.back()
      });
    }
    else{
      console.log('recipe has no id field and can not be updated')
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
    return await modal.present();
  }
  async putPhotoIn() {
    console.log('calling photo service')
    await this.photoService.takePhoto().then((res)=>{
      console.log('take photo finished');
      this.recipePhotoId = res;
      this.photoService.getPhotoById(this.recipePhotoId).subscribe((res)=>{
        if(res && res.length>0){
          this.recipePhoto = res[0];
          this.recipeHasPhoto = true;
        }
      })
    })
  }
  async takePictureOfFood(){
    this.photoService.getPhotoSaveInStorageReturnUrl().then((res)=>{
      console.log(res);
        if(typeof res === 'string' ) this.recipePhotoUrl = res;
    })
  }
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
