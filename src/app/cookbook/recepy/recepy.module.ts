import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecepyPageRoutingModule } from './recepy-routing.module';

import { RecepyPage } from './recepy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecepyPageRoutingModule
  ],
  declarations: [RecepyPage]
})
export class RecepyPageModule {}
