import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilySettingsPageRoutingModule } from './familyOverview-routing.module';

import { FamilyOverviewPage } from './familyOverview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilySettingsPageRoutingModule
  ],
  declarations: [FamilyOverviewPage]
})
export class FamilySettingsPageModule {}
