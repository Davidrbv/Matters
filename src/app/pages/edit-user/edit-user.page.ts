import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/model/photo';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  user: User = {} as User;
  users: User[];
  image: any;
  photo: Photo = {} as Photo

  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private photoService : PhotoService,
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.user = this.users[0];      
    });
  }

  async camera(){
    this.image = await this.photoService.addPicture();
    this.user.image = this.image;
    this.saveChange(this.user);
    console.log(this.user.image.formato);   
  }

  /* Confirmación de eliminación 
  async presentAlertConfirm(user: User) {
    const alert = await this.alertController.create({
      header: `${user.nombre}`,
      message: `Without changes... ¿Are you sure?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Cancel Action..');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.saveChange(this.user);
            this.presentToast('Save changes..');
            this.router.navigateByUrl('/dashboard');
          },
        },
      ],
    });

    await alert.present();
  }*/

  //TODO: MODIFICAR CONTRASEÑA E EMAIL EN FIREBASE
  /* Cambios en user */
  async saveChange(user: User) {
    if (user.password !== user.password2) {
      this.presentToast('Constraseñas no validas...');
    } else {
      this.presentToast('Realizando cambios...');
      await this.userService.updateUser(user);
      this.router.navigateByUrl(`/dashboard`);
    }
  }

  /* Cancelación de cambios */
  cancelChange() {
    this.presentToast('Cambios cancelados..');
    this.router.navigateByUrl(`/dashboard`);
  }

  /* Presentacion de acciones */
  async presentToast(message?: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'dark',
    });
    toast.present();
  }
}
