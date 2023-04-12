import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../../datatypes/recipe';
import {RecipeService} from '../../services/recipe.service';
import {PlanningService} from '../../services/planning.service';
import {FamilyService} from '../../services/family.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.page.html',
  styleUrls: ['./day-menu.page.scss'],
})
export class DayMenuPage implements OnInit {
  familyName: string;
  date: Date = new Date();
  menu: Recipe | undefined;



  constructor(public planningService:PlanningService, public familyService: FamilyService,
              public activatedRoute:ActivatedRoute) {
    this.familyName = familyService.getFamilyName();
  }

  ngOnInit() {
    this.setData()
  }
  setData(){
    const day = this.activatedRoute.snapshot.paramMap.get('day');
    if(day === null){
      return;
    }
    this.date = new Date(day);
    this.menu = this.planningService.getMenuForDate(this.date);
    this.planningService.setDateForDetail(this.date);

  }

}
