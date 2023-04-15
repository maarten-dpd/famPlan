import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from './custom-date.pipe';
import {ActivityItemComponent} from './activity-item/activity-item.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {DayCardComponent} from './day-card/day-card.component';

@NgModule({
  declarations: [CustomDatePipe, ActivityItemComponent, DayCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    CustomDatePipe,
    ActivityItemComponent,
    DayCardComponent
  ]
})
export class SharedModule { }
