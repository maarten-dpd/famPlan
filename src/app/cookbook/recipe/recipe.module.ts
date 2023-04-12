import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecepyPageRoutingModule } from './recipe-routing.module';

import { RecipePage } from './recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecepyPageRoutingModule
  ],
  declarations: [RecipePage]
})
export class RecepyPageModule {}
