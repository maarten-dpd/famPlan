import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuStepPage } from './menu-step.page';

const routes: Routes = [
  {
    path: '',
    component: MenuStepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuStepPageRoutingModule {}
