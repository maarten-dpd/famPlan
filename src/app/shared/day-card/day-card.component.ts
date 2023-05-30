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

  recipeName:string | undefined ='';
  numberOfActivities: number=0;
  recipeIsPlanned:boolean=false;
  constructor(public activityService:ActivityService,
              public planningService: PlanningService,
) {
  }

 async ngOnInit() {
    this.recipeName = await this.planningService.nameOfRecipePlannedOnDate(this.day.toString());
    if(this.recipeName?.length){
      this.recipeIsPlanned = true;
    }
    this.numberOfActivities = this.activityService.getNumberOfActivitiesOnDate(this.day.toString())
 }
 ngOnDestroy(){
 }
}
