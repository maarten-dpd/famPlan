import { Component, OnInit } from '@angular/core';
import {DayPlanService} from '../../services/day-plan.service';
import {Activity} from '../../../datatypes/activity';
import {ActivityService} from '../../services/activity.service';
import {DayPlan} from '../../../datatypes/dayPlan';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.page.html',
  styleUrls: ['./activities-list.page.scss'],
})
export class ActivitiesListPage implements OnInit {
  date: any;
  activityList: any;

  constructor(public dayPlanService : DayPlanService, public activityService:ActivityService) {

  }

  ngOnInit() {

  }

}
