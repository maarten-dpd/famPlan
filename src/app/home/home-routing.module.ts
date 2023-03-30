import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'day-menu',
    loadChildren: () => import('./day-menu/day-menu.module').then( m => m.DayMenuPageModule)
  },
  {
    path: 'activities-list',
    loadChildren: () => import('./activities-list/activities-list.module').then( m => m.ActivitiesListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
