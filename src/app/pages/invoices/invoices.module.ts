import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoicesPageRoutingModule } from './invoices-routing.module';

import { InvoicesPage } from './invoices.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, InvoicesPageRoutingModule, ComponentsModule,SwiperModule],
  declarations: [InvoicesPage],
})
export class InvoicesPageModule {}
