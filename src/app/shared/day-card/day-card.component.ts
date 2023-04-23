import {Component, Input, OnInit} from '@angular/core';
import {ActivityService} from '../../services/activity.service';
import {PlanningService} from '../../services/planning.service';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss'],
})
export class DayCardComponent  implements OnInit {

  @Input() day:Date = new Date();
  constructor(public activityService:ActivityService, public planningService: PlanningService) {
    /*console.log('activity found: ');
    console.log(this.activityService.getActivitiesByDate(this.day.toString()))
    console.log('for date: ');
    console.log(this.day);*/
  }

  ngOnInit() {

  }
}
