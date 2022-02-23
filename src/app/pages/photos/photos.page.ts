import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/model/photo';
import { Observable } from 'rxjs';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  data: any[] = Array(20);

  select: boolean = false;
  image: any;
  newPhoto: Photo = {} as Photo;
  photos: Observable<Photo[]>;

  constructor(
    private photoService: PhotoService,
    private alertController: AlertController,
    private toastController: ToastController,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    this.photos = this.photoService.getPhotos();
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const path = 'Galery';
      const name = Math.random().toString(36).slice(-12);
      const [file] = event.target.files;
      const res = await this.photoService.uploadFile(file, path, name);
      this.image = res;
      this.newPhoto.formato = res;
      this.select = true;
    }
  }

  addPhoto() {
    this.newPhoto.formato = this.image;
    this.photoService.addPhoto(this.newPhoto);
    this.select = false;
  }

  deletePhoto(image: Photo) {
    this.presentAlertConfirm(image);
  }

  async share(image: Photo) {
    await this.shareService.sharePhoto(image.formato);
  }

  /* Confirmacion eleminación photo */
  async presentAlertConfirm(image: Photo) {
    const alert = await this.alertController.create({
      header: `${image.ubicacion}`,
      message: `The image will be deleted. ¿Are you sure?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Action cancelled..');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.photoService.deletePhoto(image.photoId);
            this.presentToast('Delete image..');
          },
        },
      ],
    });

    await alert.present();
  }

  /* Presentacion de acciones realizadas */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 600,
      position: 'bottom',
      animated: true,
      color: 'dark  ',
    });
    toast.present();
  }

  //TODO: CONFIGURAR INFINITIVEsCROLL PARA CARGA DE FOTOS
  loadData(event) {
    //Metodo para simular un desfase temporal.
    setTimeout(() => {
      //Restriccion para que no cargue mas de 50 elementos.
      if (this.data.length > 50) {
        event.target.complete();
        /*Este método cancela el scroll en la página y con eso eliminamos
        /el espacio en blanco cuando se acaban los elementos que mostrar.*/
        this.infiniteScroll.disabled = true;
        return;
      }

      const nuevoArray = Array(20);
      this.data.push(...nuevoArray);

      event.target.complete(); //Este metodo cancela la recarga de la pagina al hacer Scroll para seguir cargando contenido.
    }, 1000);
  }
}
