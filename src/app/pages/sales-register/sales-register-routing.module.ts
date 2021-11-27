import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesRegisterPage } from './sales-register.page';

const routes: Routes = [
  {
    path: '',
    component: SalesRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRegisterPageRoutingModule {}
