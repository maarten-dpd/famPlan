import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecepyPage } from './recepy.page';

const routes: Routes = [
  {
    path: '',
    component: RecepyPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepyPageRoutingModule {}
