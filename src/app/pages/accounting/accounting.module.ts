import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccountingPageRoutingModule } from './accounting-routing.module';
import { AccountingPage } from './accounting.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountingPageRoutingModule, ComponentsModule],
  declarations: [AccountingPage],
})
export class AccountingPageModule {}
