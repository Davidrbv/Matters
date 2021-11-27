import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { PopinfouserComponent } from './popinfouser/popinfouser.component';



@NgModule({
  declarations: [HeaderComponent, PopinfouserComponent],
  exports:[
    HeaderComponent,
    PopinfouserComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
