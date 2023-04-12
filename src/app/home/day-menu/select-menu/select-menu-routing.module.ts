import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectMenuPage } from './select-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SelectMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectMenuPageRoutingModule {}
