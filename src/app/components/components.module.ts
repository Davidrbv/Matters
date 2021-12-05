import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PopinfouserComponent } from './popinfouser/popinfouser.component';

@NgModule({
  declarations: [PopinfouserComponent],
  exports: [PopinfouserComponent],
  imports: [CommonModule, IonicModule],
})
export class ComponentsModule {}
