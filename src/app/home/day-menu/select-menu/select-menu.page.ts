import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {Recipe} from '../../../../datatypes/recipe';
import {PlanningService} from '../../../services/planning.service';
import {ModalController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ConfirmOrCancelModalPageComponent} from '../../../shared/confirm-or-cancel-modal-page/confirm-or-cancel-modal-page.component';
import {firstValueFrom, Subscription} from 'rxjs';
import {PlannedMenu} from '../../../../datatypes/plannedMenu';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.page.html',
  styleUrls: ['./select-menu.page.scss'],
})

export class SelectMenuPage implements OnInit {
//attributes
  selectionDate =new Date();
  #recipeSub!: Subscription;
  recipes:Recipe[]=[];
  #plannedMenuSub!:Subscription;
  plannedMenus:PlannedMenu[]=[];
  currentPlannedMenu! :PlannedMenu;

//constructor
  constructor(public recipeService:RecipeService,
              public planningService:PlanningService,
              private modalController:ModalController,
              public navCtrl :NavController,
              public activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

//onInit/destroy/setData
  ngOnInit() {
    this.setData();
  }
  ngOnDestroy(){
    if(this.#recipeSub){
      this.#recipeSub.unsubscribe();
    }
    if(this.#plannedMenuSub){
      this.#plannedMenuSub.unsubscribe();
    }
  }
  private setData() {
    const day = this.activatedRoute.snapshot.paramMap.get('day');
    if(day === null){
      return;
    }
    this.selectionDate = new Date(day);
    this.#recipeSub = this.recipeService.getAllRecepies().subscribe(res=>{
      this.recipes = res;
      this.cdr.detectChanges();
    })
    this.#plannedMenuSub = this.planningService.getAllPlannedMenusForFamily().subscribe(res=>{
      this.plannedMenus = res;
      this.cdr.detectChanges();
    })
    this.currentPlannedMenu = this.plannedMenus.filter(p=>p.date === this.selectionDate.toString())[0];
  }

//change menu by showing modal
  async changeMenu(r:Recipe){
    await this.presentConfirmOrCancelModal(r);
  }
  async presentConfirmOrCancelModal(r: Recipe){
    let question;

    if(this.currentPlannedMenu === undefined){
      question = `Set ${r.name} for ${this.selectionDate.toString().substring(0,10)}`
    }
    else if(this.currentPlannedMenu){
      const currentRecipe=await firstValueFrom(this.recipeService.getRecipeById(this.currentPlannedMenu.recipeId));
      question= `Change menu from ${currentRecipe[0].name} to ${r.name}?`
    }
    const modal = await this.modalController.create({
      component: ConfirmOrCancelModalPageComponent,
      componentProps:{
        question: question,
      }
    });
    modal.onDidDismiss().then((data) =>{
      if(data){
        if(data.data.answer){
          this.setMenuForDate(r,this.selectionDate);
          this.navCtrl.navigateRoot('/home');
        }
      }
    });
    return await modal.present();
  }
  setMenuForDate(r: Recipe, d: Date) {
    //check if a planned menu with the given date exists
    const menuIsPlannedForDate = this.plannedMenus.some(p=>p.date===d.toString())
    //If a menu exists - do an update
    if(menuIsPlannedForDate){
      const menuToUpdate = this.plannedMenus.filter(p=>p.date===d.toString())[0];
      menuToUpdate.recipeId = r.id;
      this.planningService.updatePlannedMenu(menuToUpdate.id,menuToUpdate);
    }
    //otherwise create a new plannedMenusFilteredOnDate
    else{
      this.planningService.createPlannedMenu(r.id, d.toString());
    }
  }

}
