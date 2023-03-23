import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DayMenuPageRoutingModule } from './day-menu-routing.module';

import { DayMenuPage } from './day-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DayMenuPageRoutingModule
  ],
  declarations: [DayMenuPage]
})
export class DayMenuPageModule {}
