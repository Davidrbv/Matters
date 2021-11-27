import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeRegisterPageRoutingModule } from './employee-register-routing.module';

import { EmployeeRegisterPage } from './employee-register.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeRegisterPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EmployeeRegisterPage]
})
export class EmployeeRegisterPageModule {}
