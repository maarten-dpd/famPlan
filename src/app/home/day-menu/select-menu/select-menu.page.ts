import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {Recipe} from '../../../../datatypes/recipe';
import {PlanningService} from '../../../services/planning.service';
import {ModalController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ConfirmOrCancelModalPageComponent} from '../../../shared/confirm-or-cancel-modal-page/confirm-or-cancel-modal-page.component';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.page.html',
  styleUrls: ['./select-menu.page.scss'],
})
export class SelectMenuPage implements OnInit {

  selectionDate =new Date();
  constructor(public recepyService:RecipeService, public planningService:PlanningService,
              private modalController:ModalController,
              public navCtrl :NavController, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setData();
  }
  async changeMenu(r:Recipe){
    await this.presentConfirmOrCancelModal(r);
  }
  async presentConfirmOrCancelModal(r: Recipe){
    const newMenu = r.name;
    let currentMenu: string |undefined = this.planningService.getPlannedMenuName(this.selectionDate);
    let question;
    if(currentMenu === undefined){
      question = `Set ${newMenu} for ${this.selectionDate.toString().substring(0,10)}`
    }
    else{
      question= `Change menu from ${currentMenu} to ${newMenu}?`
    }
    const modal = await this.modalController.create({
      component: ConfirmOrCancelModalPageComponent,
      componentProps:{
        question: question,
      }
    });
    modal.onDidDismiss().then((data) =>{
      if(data){
        console.log('answer: ');
        console.log(data)
        if(data.data.answer){
          this.setMenuForDate(r);
          this.navCtrl.navigateRoot('/home');
        }
      }
    });
    return await modal.present();
  }

  async setMenuForDate(r: Recipe) {
    if (this.planningService.menuIsPlannedForDate(this.selectionDate)) {
      this.planningService.removeMenuForDate(this.selectionDate.toString())
    }
    this.planningService.setMenuForDate(r.id, this.selectionDate.toString());
  }

  private setData() {
    const day = this.activatedRoute.snapshot.paramMap.get('day');
    console.log(day);
    if(day === null){
      return;
    }
    this.selectionDate = new Date(day);
  }
}
