import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesPage } from './sales.page';

const routes: Routes = [
  {
    path: '',
    component: SalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesPageRoutingModule {}
