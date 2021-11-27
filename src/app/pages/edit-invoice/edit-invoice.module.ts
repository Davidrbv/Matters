import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInvoicePageRoutingModule } from './edit-invoice-routing.module';

import { EditInvoicePage } from './edit-invoice.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditInvoicePageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditInvoicePage]
})
export class EditInvoicePageModule {}
