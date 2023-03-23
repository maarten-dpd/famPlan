import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayToDoListPage } from './day-to-do-list.page';

const routes: Routes = [
  {
    path: '',
    component: DayToDoListPage
  },
  {
    path: 'to-do',
    loadChildren: () => import('../day-To-Do-List/to-do/to-do.module').then( m => m.ToDoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DayToDoListPageRoutingModule {}
