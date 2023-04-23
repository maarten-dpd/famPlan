import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {Recipe} from '../../../../datatypes/recipe';
import {PlanningService} from '../../../services/planning.service';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.page.html',
  styleUrls: ['./select-menu.page.scss'],
})
export class SelectMenuPage implements OnInit {

  selectionDate =new Date();
  constructor(public recepyService:RecipeService, public planningService:PlanningService, private toastController:ToastController,
              public navCtrl :NavController, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setData();
  }
/*
  toast method found at
  https://stackoverflow.com/questions/65611158/redirecting-to-other-page-when-alert-message-clicked-ok-in-an-ionic-app
*/
  async setMenuForDate(r: Recipe) {
    if(this.planningService.menuIsPlannedForDate(this.selectionDate)){
      this.planningService.removeMenuForDate(this.selectionDate.toString())
    }
    this.planningService.setMenuForDate(r.id,this.selectionDate.toString());
  /*  console.log(this.planningService.getMenuForDate(this.planningService.dateForDetail.toString()));
    */

    const toast = await this.toastController.create({
      message: 'A menu was selected',
      position: 'top',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('ok clicked');
          }
        },
      ]
    });
    await toast.present();
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
