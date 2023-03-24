import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecepyPage } from './recepy.page';

const routes: Routes = [
  {
    path: '',
    component: RecepyPage
  },
  {
    path: 'menu-step',
    loadChildren: () => import('./menu-step/menu-step.module').then( m => m.MenuStepPageModule)
  },
  {
    path: 'ingredient',
    loadChildren: () => import('./ingredient/ingredient.module').then( m => m.IngredientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepyPageRoutingModule {}
