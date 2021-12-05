import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario = {
    email: '',
    password: '',
  };

  usuarioLog: User;

  constructor(private router: Router, private userService: UserService, private toastController: ToastController) {}

  /* Valida las credenciales del usuario */

  async isUser(): Promise<Boolean> {
    if (this.usuario.email === '' && this.usuario.password === '') return false;
    const users = await this.getUsers();
    let coincide = users.find((user) => {
      return this.usuario.email === user.email && this.usuario.password === user.password;
    });
    if (!!coincide) {
      this.usuarioLog = users.filter(
        (user) => this.usuario.email === user.email && this.usuario.password === user.password
      )[0];
    }

    return !!coincide;
  }

  /* Comprueba las credenciales del usuario */

  async login() {
    if (await this.isUser()) {
      this.router.navigateByUrl(`/dashboard${this.usuarioLog.id !== undefined ? '/' + this.usuarioLog.id : ''}`);
    } else {
      await this.presentToast();
    }
  }

  /* Recupera usuarios de Storage */

  async getUsers(): Promise<User[]> {
    return await this.userService.getUserFromStorage();
  }

  /* Redireccion a RegiterPage */
  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  /* Envío de mensaje de error */

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos...',
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'dark  ',
    });
    toast.present();
  }
}
