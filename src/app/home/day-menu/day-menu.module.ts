import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DayMenuPageRoutingModule } from './day-menu-routing.module';

import { DayMenuPage } from './day-menu.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DayMenuPageRoutingModule,
        SharedModule
    ],
  declarations: [DayMenuPage]
})
export class DayMenuPageModule {}
