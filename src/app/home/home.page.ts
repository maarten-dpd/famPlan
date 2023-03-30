import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import {FamilyService} from '../services/family.service';
import {RecepyService} from '../services/recepy.service';
import {ActivityService} from '../services/activity.service';
import {Activity} from '../../datatypes/activity';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  familyName: string = '';
  startDate = new Date() ;
  currentWeekDays: Date[] = [];

  allActivities: Activity[] = this.activityService.getAllActivities();
  allPlannedMenus = this.recepyService.GetAllPlannedMenus();


  constructor(public navCtrl: NavController, public familyService: FamilyService, public recepyService: RecepyService
  , public activityService: ActivityService) {

    this.familyName = familyService.getFamilyName()
    for(let i = 0;i<7;i++){
        let result = new Date(this.startDate);
        result.setDate(result.getDate() + i);
        this.currentWeekDays.push(result);
    }

  }


}
