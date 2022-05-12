import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { PhotoService } from "src/app/services/photo.service";
import { Photo } from "src/app/model/photo";
import { Observable } from "rxjs";
//import { ShareService } from 'src/app/services/share.service';

import { SwiperOptions } from "swiper";
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Pagination, EffectCube } from "swiper";
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';

SwiperCore.use([Pagination, EffectCube]);

@Component({
  selector: "app-photos",
  templateUrl: "./photos.page.html",
  styleUrls: ["./photos.page.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PhotosPage implements OnInit, AfterContentChecked {
  @ViewChild("swiper") swiper: SwiperComponent;
  config: SwiperOptions = {
    grabCursor: true,
    slidesPerView: "auto",
    pagination: true,
    effect: "cube",
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  };

  select: boolean = false;
  image: any;
  newPhoto: Photo = {} as Photo;
  photos: Observable<Photo[]>;

  constructor(
    private photoService: PhotoService,
    private alertController: AlertController,
    private toastController: ToastController
  ) //private shareService: ShareService,
  {
  }

  ngAfterContentChecked(): void {
    if (this.swiper) this.swiper.updateSwiper({});
  }

  ngOnInit() {
    this.photos = this.photoService.getPhotos();
  }

  async browsePhoto() {
    const path = "UsersGalery";
    this.image = await this.photoService.addPicture();
    const res = await this.photoService.uploadFile(this.image, path);
    this.image = res;
    this.newPhoto.formato = res;
    this.select = true;
  }

  /* Save Photo */
  addPhoto() {
    this.newPhoto.formato = this.image;
    this.photoService.addPhoto(this.newPhoto);
    this.select = false;
  }

  /* Delete Photo */
  deletePhoto(image: Photo) {
    this.presentAlertConfirm(image);
  }

  //TODO: Compartir fotos en redes
  /* Share Photo */
  // share(image: Photo) {
  //   this.shareService.sharePhoto(image.formato);
  // }

  /* Delete photo confirm */
  async presentAlertConfirm(image: Photo) {
    const alert = await this.alertController.create({
      header: `${image.ubicacion || "Photo"}`,
      message: `The image will be deleted. ¿Are you sure?`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.presentToast("Action cancelled..");
          }
        },
        {
          text: "Ok",
          handler: () => {
            this.photoService.deletePhoto(image.photoId);
            this.presentToast("Delete image..");
          }
        }
      ]
    });

    await alert.present();
  }

  /* Actions present */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 600,
      position: "bottom",
      animated: true,
      color: "dark  "
    });
    toast.present();
  }
}
