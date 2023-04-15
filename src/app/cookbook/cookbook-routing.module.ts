import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookbookPage } from './cookbook.page';

const routes: Routes = [
  {
    path: '',
    component: CookbookPage
  },
  {
    path: 'recipe',
    loadChildren: () => import('./recipe/recipe.module').then(m => m.RecepyPageModule)
  },
  {
    path: 'recipe/:id',
    loadChildren: () => import('./recipe/recipe.module').then(m => m.RecepyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookbookPageRoutingModule {}
