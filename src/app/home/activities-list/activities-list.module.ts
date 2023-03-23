import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivitiesListPageRoutingModule } from './activities-list-routing.module';

import { ActivitiesListPage } from './activities-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivitiesListPageRoutingModule
  ],
  declarations: [ActivitiesListPage]
})
export class ActivitiesListPageModule {}
