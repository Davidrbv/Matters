import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
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

  imagen : string = '';

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

  async newImageUpload(event : any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = ((imagen) => {
        this.imagen = imagen.target.result as string
      });
      reader.readAsDataURL(event.target.files[0]);
    }
    const path = 'Photos'
    const name = this.user.userId;
    const file = event.target.files[0];
    const res = await this.photoService.uploadFile(file,path,name);
    this.user.image = res;    
  }


  //TODO: MODIFICAR CONTRASEÑA E EMAIL EN FIREBASE
  /* Cambios en user */
  async saveChange(user: User) {
    if (user.password !== user.password2) {
      this.presentToast('Error passwords...');
    } else {
      this.presentToast('Making changes...');
      await this.userService.updateUser(user);
      this.router.navigateByUrl(`/dashboard`);
    }
  }

  /* Cancelación de cambios */
  cancelChange() {
    this.presentToast('Changes cancelled..');
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
