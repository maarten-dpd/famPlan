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
import {ConfirmOrCancelModalPageComponent} from './confirm-or-cancel-modal-page/confirm-or-cancel-modal-page.component';
import {InformationModalPageComponent} from './information-modal-page/information-modal-page.component';


@NgModule({
  declarations: [
    CustomDatePipe,
    ActivityItemComponent,
    DayCardComponent,
    RecipeItemComponent,
    StringInputModalPageComponent,
    ConfirmOrCancelModalPageComponent,
    InformationModalPageComponent
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
    StringInputModalPageComponent,
    ConfirmOrCancelModalPageComponent,
    InformationModalPageComponent
  ]
})
export class SharedModule { }
