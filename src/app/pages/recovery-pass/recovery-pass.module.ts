import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoveryPassPageRoutingModule } from './recovery-pass-routing.module';

import { RecoveryPassPage } from './recovery-pass.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoveryPassPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RecoveryPassPage]
})
export class RecoveryPassPageModule {}
