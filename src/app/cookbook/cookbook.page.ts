import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../services/recipe.service';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.page.html',
  styleUrls: ['./cookbook.page.scss'],
})
export class CookbookPage implements OnInit {
  fabIsVisible = true;

  constructor(public recepyService: RecipeService) { }

  ngOnInit() {
  }

  logScrollStart():void {
    this.fabIsVisible=false
  }

  logScrollEnd():void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }
}
