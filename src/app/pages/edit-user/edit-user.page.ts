import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/model/photo';
import { updateEmail, updatePassword, deleteUser } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  user: User = {} as User;
  photo: Photo = {} as Photo;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private photoService: PhotoService,
    private authService: AuthService,
    private alertController : AlertController
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      [this.user] = data;
    });
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const path = 'Photos';
      const name = this.user.userId;
      const file = event.target.files[0];
      const res = await this.photoService.uploadFile(file, path, name);
      this.user.image = res;
    }
  }

  /* User's changes */
  saveChange(user: User) {
    if (user.password !== user.password2) {
      this.presentToast('Error passwords...');
    } else {
      updateEmail(this.authService.getCurrentUser(), user.email)
        .then(() => {
          updatePassword(this.authService.getCurrentUser(), user.password2)
            .then(() => {
              this.userService.updateUser(user);
              this.presentToast('Making changes...');
              this.router.navigateByUrl(`/dashboard`);
            })
            .catch((error) => {
              this.presentToast('Password change error...try again..');
            });
        })
        .catch((error) => {
          this.presentToast('Email change error...try again..');
        });
    }
  }

  deleteUser(){
    deleteUser(this.authService.getCurrentUser()).then(() => {
    }).catch((error) => {
      this.presentToast('Delete error..');
    });
  }

  /* Cancel Change */
  cancelChange() {
    this.presentToast('Changes cancelled..');
    this.router.navigateByUrl(`/dashboard`);
  }

  /* Delete User */

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: `Email: ${this.authService.getCurrentUser().email}`,
      subHeader: `¿Why ${this.user.nombre}?`,
      message: `Your account will be deleted. ¿Are you sure?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Cancel Action..fiiiiuuu..');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.presentToast('User Deleted..See you soon!!!');
            this.deleteUser();
            this.router.navigateByUrl('/home');
          },
        },
      ],
    });

    await alert.present();
  }

  /* Messages Alert */
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
