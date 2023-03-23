import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayMenuPage } from './day-menu.page';

const routes: Routes = [
  {
    path: '',
    component: DayMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DayMenuPageRoutingModule {}
