import { Component, OnInit } from '@angular/core';
import {Activity} from '../../../datatypes/activity';
import {ActivityService} from '../../services/activity.service';
import {today} from 'ionicons/icons';


@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.page.html',
  styleUrls: ['./activities-list.page.scss'],
})
export class ActivitiesListPage implements OnInit {
  date: any;
  activityList: Activity[] = [];

  constructor(public activityService:ActivityService) {

  }

  ngOnInit() {

  }

}
