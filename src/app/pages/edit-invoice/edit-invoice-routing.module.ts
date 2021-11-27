import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInvoicePage } from './edit-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: EditInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInvoicePageRoutingModule {}
