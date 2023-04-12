import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectMenuPageRoutingModule } from './select-menu-routing.module';

import { SelectMenuPage } from './select-menu.page';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SelectMenuPageRoutingModule,
        SharedModule
    ],
  declarations: [SelectMenuPage]
})
export class SelectMenuPageModule {}
