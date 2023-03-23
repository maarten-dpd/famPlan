import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilySettingsPage } from './family-settings.page';

const routes: Routes = [
  {
    path: '',
    component: FamilySettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilySettingsPageRoutingModule {}
