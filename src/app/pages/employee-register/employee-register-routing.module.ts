import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeRegisterPage } from './employee-register.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRegisterPageRoutingModule {}
