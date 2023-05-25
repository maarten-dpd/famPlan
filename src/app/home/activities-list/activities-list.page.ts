import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Activity} from '../../../datatypes/activity';
import {ActivityService} from '../../services/activity.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.page.html',
  styleUrls: ['./activities-list.page.scss'],
})
export class ActivitiesListPage implements OnInit {
  date: string = '';
  activityList: Activity[] = [];
  dateForTitle = new Date();
  constructor(public activityService:ActivityService,
              public activatedRoute:ActivatedRoute,
              ) {
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
    this.date = this.dateForTitle.toString()
    this.activityList = this.activityService.getActivitiesByDateForCurrentFamily(this.date);
  }
  ngOnDestroy(){

  }

}
