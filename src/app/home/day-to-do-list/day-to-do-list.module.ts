import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DayToDoListPageRoutingModule } from './day-to-do-list-routing.module';

import { DayToDoListPage } from './day-to-do-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DayToDoListPageRoutingModule
  ],
  declarations: [DayToDoListPage]
})
export class DayToDoListPageModule {}
