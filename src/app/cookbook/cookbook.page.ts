import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RecipeService} from '../services/recipe.service';
import {Subscription} from 'rxjs';
import {Recipe} from '../../datatypes/recipe';
import {FamilyService} from '../services/family.service';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.page.html',
  styleUrls: ['./cookbook.page.scss'],
})
export class CookbookPage implements OnInit {
  fabIsVisible = true;
  #recipeSub!:Subscription;
  recipes:Recipe[]=[]

  constructor(public recipeService: RecipeService,
              private familyService:FamilyService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.#recipeSub = this.recipeService.getRecipesByFamilyId().subscribe(res=>{
      this.recipes = res;
      this.cdr.detectChanges()
    })
  }

  logScrollStart():void {
    this.fabIsVisible=false
  }

  logScrollEnd():void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }
}
