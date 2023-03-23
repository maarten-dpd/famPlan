import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookbookPage } from './cookbook.page';

const routes: Routes = [
  {
    path: '',
    component: CookbookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookbookPageRoutingModule {}
