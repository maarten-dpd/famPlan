import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivityService} from '../../services/activity.service';
import {PlanningService} from '../../services/planning.service';
import {PlannedMenu} from '../../../datatypes/plannedMenu';
import {Recipe} from '../../../datatypes/recipe';
import {RecipeService} from '../../services/recipe.service';
import {Subscription} from 'rxjs';
import {FamilyService} from '../../services/family.service';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss'],
})
export class DayCardComponent  implements OnInit {

  @Input() day:Date = new Date();

  #plannedMenuSub!:Subscription;
  plannedMenus:PlannedMenu[] |undefined;
  plannedMenu:PlannedMenu[] = [];
  recipeId:string=''
  recipes:Recipe[]=[];
  recipe:Recipe[]=[]
  #recipeSub!:Subscription;
  menuplanned = false;


  constructor(public activityService:ActivityService,
              public planningService: PlanningService,
              public recipeService: RecipeService,
              public familyService: FamilyService,
              private cdr:ChangeDetectorRef
) {
  }

 ngOnInit() {

   this.#plannedMenuSub = this.planningService.getAllPlannedMenusForFamily().subscribe(res => {
     this.plannedMenus = res;
     this.plannedMenu = this.plannedMenus
       .filter(p => p.date.substring(0, 15) === this.day.toString().substring(0, 15))
     console.log(this.plannedMenu);
     this.plannedMenu.filter(p=>p.familyId === this.familyService.currentFamilyId)
     console.log(this.familyService.currentFamilyId);
     console.log(this.plannedMenu);
     if(this.plannedMenu.length>0){
       this.recipeId = this.plannedMenu[0].recipeId;
       this.menuplanned = true;
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
 ngOnDestroy(){
    if(this.#plannedMenuSub){
      this.#plannedMenuSub.unsubscribe()
    }
    if(this.#recipeSub){
      this.#recipeSub.unsubscribe()
    }
 }
}
