import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CookbookPageRoutingModule } from './cookbook-routing.module';

import { CookbookPage } from './cookbook.page';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CookbookPageRoutingModule,
        SharedModule
    ],
  declarations: [CookbookPage]
})
export class CookbookPageModule {}
