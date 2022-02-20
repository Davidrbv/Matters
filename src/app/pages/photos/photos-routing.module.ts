import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosPage } from './photos.page';

const routes: Routes = [
  {
    path: '',
    component: PhotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosPageRoutingModule {}
