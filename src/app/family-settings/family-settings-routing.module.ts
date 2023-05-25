import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilySettingsPage } from './family-settings.page';

const routes: Routes = [
  {
    path: '',
    component: FamilySettingsPage
  },
  {
    path: 'family-member',
    loadChildren: () => import('./family-member/family-member.module').then( m => m.FamilyMemberPageModule)
  },
  {
    path: 'family-member/:id',
    loadChildren: () => import('./family-member/family-member.module').then( m => m.FamilyMemberPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilySettingsPageRoutingModule {}
