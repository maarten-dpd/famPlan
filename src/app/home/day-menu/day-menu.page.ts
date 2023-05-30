import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Recipe} from '../../../datatypes/recipe';
import {PlanningService} from '../../services/planning.service';
import {FamilyService} from '../../services/family.service';
import {ActivatedRoute} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {PlannedMenu} from '../../../datatypes/plannedMenu';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.page.html',
  styleUrls: ['./day-menu.page.scss'],
})

export class DayMenuPage implements OnInit {
//attributes
  familyName: string = '';
  date: Date = new Date();
  menu: Recipe | undefined;
  plannedMenu:PlannedMenu[] = [];
  recipeId:string=''
  recipe:Recipe[]=[];

//constructor
  constructor(public planningService:PlanningService,
              public familyService: FamilyService,
              public activatedRoute:ActivatedRoute,
              public recipeService: RecipeService,
              private cdr:ChangeDetectorRef) {
  }

//OnInit/destroy/setData
  async ngOnInit() {
    await this.setData()
  }
  ngOnDestroy(){
  }
  private async setData(){
    const day = this.activatedRoute.snapshot.paramMap.get('day');
    if(day === null){
      return;
    }
    this.date = new Date(day);
    this.plannedMenu = await firstValueFrom(this.planningService.getAllPlannedMenusForFamily());
    this.plannedMenu.filter(p => p.date.substring(0, 15) === this.date.toString().substring(0, 15));
    if(this.plannedMenu.length>0){
      this.recipeId = this.plannedMenu[0].recipeId;
      if(this.recipeId){
        this.recipe = await firstValueFrom(this.recipeService.getRecipeById(this.recipeId));
      }
    }
  }
}
