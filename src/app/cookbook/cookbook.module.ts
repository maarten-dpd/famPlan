import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CookbookPageRoutingModule } from './cookbook-routing.module';

import { CookbookPage } from './cookbook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CookbookPageRoutingModule
  ],
  declarations: [CookbookPage]
})
export class CookbookPageModule {}
