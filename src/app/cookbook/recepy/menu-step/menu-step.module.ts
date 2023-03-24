import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuStepPageRoutingModule } from './menu-step-routing.module';

import { MenuStepPage } from './menu-step.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuStepPageRoutingModule
  ],
  declarations: [MenuStepPage]
})
export class MenuStepPageModule {}
