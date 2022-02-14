import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoveryPassPage } from './recovery-pass.page';

const routes: Routes = [
  {
    path: '',
    component: RecoveryPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoveryPassPageRoutingModule {}
