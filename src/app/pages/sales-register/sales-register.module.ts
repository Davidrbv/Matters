import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SalesRegisterPageRoutingModule } from "./sales-register-routing.module";

import { SalesRegisterPage } from "./sales-register.page";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesRegisterPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SalesRegisterPage]
})
export class SalesRegisterPageModule {}
