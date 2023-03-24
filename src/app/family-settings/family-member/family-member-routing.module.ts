import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyMemberPage } from './family-member.page';

const routes: Routes = [
  {
    path: '',
    component: FamilyMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyMemberPageRoutingModule {}
