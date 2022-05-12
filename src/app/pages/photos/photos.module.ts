import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PhotosPageRoutingModule } from "./photos-routing.module";

import { PhotosPage } from "./photos.page";
import { ComponentsModule } from "src/app/components/components.module";
import { SwiperModule } from "swiper/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotosPageRoutingModule,
    ComponentsModule,
    SwiperModule
  ],
  declarations: [PhotosPage]
})
export class PhotosPageModule {}
