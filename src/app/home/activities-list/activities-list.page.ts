import {Component, OnInit} from '@angular/core';
import {Activity} from '../../../datatypes/activity';
import {ActivityService} from '../../services/activity.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.page.html',
  styleUrls: ['./activities-list.page.scss'],
})

export class ActivitiesListPage implements OnInit {
//attributes
  date: string = '';
  activityList: Activity[] = [];
  dateForTitle = new Date();

//constructor
  constructor(public activityService:ActivityService,
              public activatedRoute:ActivatedRoute,
              ) {
  }

//On Init/Destroy/setData
  ngOnInit() {
  this.setData();
  }
  ngOnDestroy(){

  }
  private setData() {
    const day = this.activatedRoute.snapshot.paramMap.get('day');
    if(day === null){
      return;
    }
    this.dateForTitle = new Date(day);
    this.date = this.dateForTitle.toString()
    this.activityList = this.activityService.getActivitiesByDateForCurrentFamily(this.date);
  }
}
