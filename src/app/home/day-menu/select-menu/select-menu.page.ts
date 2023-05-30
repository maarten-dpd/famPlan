import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {Recipe} from '../../../../datatypes/recipe';
import {PlanningService} from '../../../services/planning.service';
import {ModalController, NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmOrCancelModalPageComponent} from '../../../shared/confirm-or-cancel-modal-page/confirm-or-cancel-modal-page.component';
import {firstValueFrom} from 'rxjs';
import {PlannedMenu} from '../../../../datatypes/plannedMenu';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.page.html',
  styleUrls: ['./select-menu.page.scss'],
})

export class SelectMenuPage implements OnInit {
//attributes
  selectionDate =new Date();
  recipes:Recipe[]=[];
  plannedMenus:PlannedMenu[]=[];
  currentPlannedMenus:PlannedMenu[]=[]
  currentPlannedMenu! :PlannedMenu;

//constructor
  constructor(public recipeService:RecipeService,
              public planningService:PlanningService,
              private modalController:ModalController,
              public navCtrl :NavController,
              public activatedRoute: ActivatedRoute,
              private router:Router
  ) {  }

//onInit/destroy/setData
  async ngOnInit() {
    await this.setData();
  }
  ngOnDestroy(){
  }
  private async setData() {
    const day = this.activatedRoute.snapshot.paramMap.get('day');
    if(day === null){
      return;
    }
    this.selectionDate = new Date(day);
    console.log(this.selectionDate)
    this.recipes = await firstValueFrom(this.recipeService.getAllRecepies())
    this.plannedMenus = await firstValueFrom(this.planningService.getAllPlannedMenusForFamily())
    console.log(this.plannedMenus)
    if(this.plannedMenus.length>0){
      this.currentPlannedMenus = this.plannedMenus.filter(p=>p.date.substring(0,15) ===
        this.selectionDate.toString().substring(0,15));
      this.currentPlannedMenu = this.currentPlannedMenus[0];
    }
    console.log(this.currentPlannedMenus)
  }

//change menu by showing modal
  menuPlanned: any;
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
          this.router.navigate(['/'])
        }
      }
    });
    return await modal.present();
  }
  setMenuForDate(r: Recipe, d: Date) {

    //If a menu exists - do an update
    if(this.currentPlannedMenu){
      const menuToUpdate = {
        date:this.currentPlannedMenu.date,
        recipeId: r.id,
        id:this.currentPlannedMenu.id,
        familyId: this.currentPlannedMenu.familyId
      }
      this.planningService.updatePlannedMenu(menuToUpdate.id,menuToUpdate).then(()=>{
        console.log('menu is updated');
      });
    }
    //otherwise create a new plannedMenusFilteredOnDate
    else{
      this.planningService.createPlannedMenu(r.id, d.toString()).then(()=>{
        console.log('menu is planned')
      });
    }
  }

}
