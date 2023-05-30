import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RecipeService} from '../services/recipe.service';
import {firstValueFrom, Subscription} from 'rxjs';
import {Recipe} from '../../datatypes/recipe';
import {FamilyService} from '../services/family.service';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.page.html',
  styleUrls: ['./cookbook.page.scss'],
})

export class CookbookPage implements OnInit {

 //attributes
  fabIsVisible = true;
  #recipeSub!:Subscription;
  recipes:Recipe[]=[]

 //constructor
  constructor(public recipeService: RecipeService,
              private familyService:FamilyService,
              private cdr: ChangeDetectorRef) { }

 //on Init/destroy
  async ngOnInit() {
    this.recipes = await firstValueFrom(this.recipeService.getAllRecepies())
  }
  ngOnDestroy(){
  }

 //functionality: hide button on scroll show again after scroll
  logScrollStart():void {
    this.fabIsVisible=false
  }
  logScrollEnd():void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }
}
