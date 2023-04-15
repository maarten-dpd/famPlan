import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayMenuPage } from './day-menu.page';

const routes: Routes = [
  {
    path: '',
    component: DayMenuPage
  },
  {
    path: 'select-menu',
    loadChildren: () => import('./select-menu/select-menu.module').then( m => m.SelectMenuPageModule)
  },
  {
    path: 'select-menu/:day',
    loadChildren: () => import('./select-menu/select-menu.module').then( m => m.SelectMenuPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DayMenuPageRoutingModule {}
