import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Recipe} from '../../../datatypes/recipe';
import {PlanningService} from '../../services/planning.service';
import {FamilyService} from '../../services/family.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
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
  #plannedMenuSub!:Subscription;
  plannedMenus:PlannedMenu[] |undefined;
  plannedMenu:PlannedMenu[] = [];
  recipeId:string=''
  recipes:Recipe[]=[];
  recipe:Recipe[]=[]
  #recipeSub!:Subscription;

//constructor
  constructor(public planningService:PlanningService,
              public familyService: FamilyService,
              public activatedRoute:ActivatedRoute,
              public recipeService: RecipeService,
              private cdr:ChangeDetectorRef) {
  }

//OnInit/destroy/setData
  ngOnInit() {
    this.setData()
  }
  ngOnDestroy(){
    if(this.#recipeSub){
      this.#recipeSub.unsubscribe();
    }
    if(this.#plannedMenuSub){
      this.#plannedMenuSub.unsubscribe()
    }
  }
  setData(){
    const day = this.activatedRoute.snapshot.paramMap.get('day');
    if(day === null){
      return;
    }
    else{
      this.date = new Date(day);
      this.#plannedMenuSub = this.planningService.getAllPlannedMenusForFamily().subscribe(res => {
        this.plannedMenus = res;
        this.plannedMenu = this.plannedMenus
          .filter(p => p.date.substring(0, 15) === this.date.toString().substring(0, 15))
        if(this.plannedMenu.length>0){
          this.recipeId = this.plannedMenu[0].recipeId;
        }
        this.#recipeSub = this.recipeService.getAllRecepies().subscribe((res)=>{
          this.recipes = res;
          if(this.recipeId){
            this.recipe = this.recipes
              .filter(r=>r.id === this.recipeId)
          }
        })
        this.cdr.detectChanges()
      })
    }
  }
}
