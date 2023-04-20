import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../datatypes/recipe';
import {RecipeService} from '../../services/recipe.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent  implements OnInit {

  @Input() recipe: Recipe | undefined;
  constructor(public recipeService:RecipeService, public router:Router) { }

  ngOnInit() {}

}
