import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesRegisterPageRoutingModule } from './sales-register-routing.module';

import { SalesRegisterPage } from './sales-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesRegisterPageRoutingModule
  ],
  declarations: [SalesRegisterPage]
})
export class SalesRegisterPageModule {}
