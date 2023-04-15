import { Component, OnInit } from '@angular/core';
import {Activity} from '../../../datatypes/activity';
import {ActivityService} from '../../services/activity.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.page.html',
  styleUrls: ['./activities-list.page.scss'],
})
export class ActivitiesListPage implements OnInit {
  date: string = '';
  activityList: Activity[] = [];
  dateForTitle = new Date();

  constructor(public activityService:ActivityService, public activatedRoute:ActivatedRoute) {

  }

  ngOnInit() {
  this.setData();
  }

  private setData() {
    const day = this.activatedRoute.snapshot.paramMap.get('day');
    if(day === null){
      return;
    }
    this.dateForTitle = new Date(day);
    /*console.log(this.dateForTitle);*/
    this.date = this.dateForTitle.toString()
    /*console.log(this.date)*/
    this.activityList = this.activityService.getActivitiesByDate(this.date);

  }
}
