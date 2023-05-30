import {Component, OnInit} from '@angular/core';
import {Activity} from '../../../datatypes/activity';
import {ActivityService} from '../../services/activity.service';
import {ActivatedRoute} from '@angular/router';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.page.html',
  styleUrls: ['./activities-list.page.scss'],
})

export class ActivitiesListPage implements OnInit {
//attributes
  fabIsVisible = true;
  date: string | null = '';
  activityList: Activity[] = [];
  activityListForDate: Activity[]=[];
  dateForTitle = new Date();

//constructor
  constructor(public activityService:ActivityService,
              public activatedRoute:ActivatedRoute,
              ) {
  }

//On Init/Destroy/setData
  async ngOnInit() {
  await this.setData();
  }
  ngOnDestroy(){

  }
  private async setData() {
    this.date = this.activatedRoute.snapshot.paramMap.get('day');
    if(this.date === null){
      return;
    }
    console.log(this.date)
    this.dateForTitle = new Date(this.date);
    this.activityList = await firstValueFrom(this.activityService.getAllActivitiesForCurrentFamilyFromDatabase());
    this.activityListForDate = this.activityList.filter(a=>a.date.substring(0,15)===this.date?.substring(0,15));
  }

//functionality: hide button on scroll show again after scroll
  logScrollStart():void {
    this.fabIsVisible=false
  }
  logScrollEnd():void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }
}
