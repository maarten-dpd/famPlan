import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from './custom-date.pipe';
import {ActivityItemComponent} from './activity-item/activity-item.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {DayCardComponent} from './day-card/day-card.component';
import {RecipeItemComponent} from './recipe-item/recipe-item.component';
import {StringInputModalPageComponent} from './string-input-modal-page/string-input-modal-page.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CustomDatePipe,
    ActivityItemComponent,
    DayCardComponent,
    RecipeItemComponent,
    StringInputModalPageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomDatePipe,
    ActivityItemComponent,
    DayCardComponent,
    RecipeItemComponent,
    StringInputModalPageComponent
  ]
})
export class SharedModule { }
