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
  plannedMenus: PlannedMenu[]=[];
  plannedMenusFilteredOnDate:PlannedMenu[] = [];
  plannedMenusFilteredOnDateAndFamilyId:PlannedMenu[]=[];
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

 async ngOnInit() {


  this.#plannedMenuSub = this.planningService.getAllPlannedMenusForFamily().subscribe(res => {
    this.plannedMenus = res;
    this.plannedMenusFilteredOnDate = this.plannedMenus
      .filter(p => p.date.substring(0, 15) === this.day.toString().substring(0, 15))
    if(this.plannedMenusFilteredOnDate.length>0){
      // console.log('na filtering op datum bevat PlannedMenufilteredondate');
      // console.log(this.plannedMenusFilteredOnDate);
    }

    this.plannedMenusFilteredOnDateAndFamilyId = this.plannedMenusFilteredOnDate
      .filter(p=>p.familyId === this.familyService.currentFamilyId)
    if(this.plannedMenusFilteredOnDateAndFamilyId.length>0){
      // console.log('na filtering van PlannedMenufilteredondate op family id ' + this.familyService.currentFamilyId + ' bevat plannedmenufilteredondateandfamilyid ')
      // console.log(this.plannedMenusFilteredOnDateAndFamilyId);
    }

    if(this.plannedMenusFilteredOnDateAndFamilyId.length>0){
      // console.log('het 1ste element in plannedmenufilteredonDateAndFamilyId = ')
      // console.log(this.plannedMenusFilteredOnDateAndFamilyId[0]);
      this.recipeId = this.plannedMenusFilteredOnDateAndFamilyId[0].recipeId;
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
