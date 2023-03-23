import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilySettingsPageRoutingModule } from './family-settings-routing.module';

import { FamilySettingsPage } from './family-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilySettingsPageRoutingModule
  ],
  declarations: [FamilySettingsPage]
})
export class FamilySettingsPageModule {}
