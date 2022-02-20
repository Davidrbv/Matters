import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/model/photo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  data: any[] = Array(20);
  select : boolean = false;
  image : any;
  newPhoto : Photo = {} as Photo;
  photos : Observable<Photo[]>;

  constructor(private photoService : PhotoService,
              private alertController : AlertController,
              private toastController : ToastController) {}

  ngOnInit() {
    this.photos = this.photoService.getPhotos();
  }

  async camera(){
    this.image = await this.photoService.addPicture();
    this.select = true; 
  }

  addPhoto(){
    this.newPhoto.formato = this.image;
    this.photoService.addPhoto(this.newPhoto);
    this.select = false;
  }

  deletePhoto(image: Photo){
    this.presentAlertConfirm(image);
    
  }

  share(image : Photo){
    //TODO: lÓGICA PARA COMPARTIR FOTOS!!!!!!!!!
    console.log("compartiendo................................");
    
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



  /* referencia() {
    const file = this.takePicture();

    const storage = getStorage();

    // Points to the root reference
    const storageRef = ref(storage);

    // Points to 'images'
    const imagesRef = ref(storageRef, 'images/'+ this.file);

    // Points to 'images/space.jpg'
    // Note that you can use variables to create child values
    const fileName = 'space.jpg';
    const spaceRef = ref(imagesRef, fileName);

    // File path is 'images/space.jpg'
    const path = spaceRef.fullPath;
    console.log(path);
    // File name is 'space.jpg'
    const name = spaceRef.name;
    console.log(name);
    // Points to 'images'
    const imagesRefAgain = spaceRef.parent;
    console.log(imagesRefAgain);

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    
  } */
}
