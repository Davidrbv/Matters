import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PopinfouserComponent } from './popinfouser/popinfouser.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';

@NgModule({
  declarations: [PopinfouserComponent,ShowHidePasswordComponent],
  exports: [PopinfouserComponent,ShowHidePasswordComponent],
  imports: [CommonModule, IonicModule],
})
export class ComponentsModule {}
