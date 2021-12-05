import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario: User = {
    id: undefined,
    email: '',
    nombre: '',
    password: '',
    password2: '',
  };

  usuarios: User[] = [];

  constructor(private userService: UserService, private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    this.getUsers();
  }

  /* Recupera usuarios de storage */
  getUsers() {
    return this.userService.getUserFromStorage().then((data) => {
      this.usuarios = data;
    });
  }

  /* Comprueba validez de datos introducidos */
  compruebaUsuario(usuario: User): Boolean {
    if (usuario.email === '' || usuario.nombre === '' || usuario.password !== usuario.password2) return true;
    let repetido = this.usuarios.filter((user) => {
      return user.nombre === usuario.nombre || user.email === usuario.email;
    });
    return !(repetido.length < 1);
  }

  /* Regitro de usuario */
  userRegister(usuario: User) {
    this.getUsers();
    if (this.compruebaUsuario(usuario)) {
      if (usuario.password !== usuario.password2) {
        this.presentToast('Constraseñas no validas...');
      } else this.presentToast('Usuario no valido..');
    } else {
      this.userService.saveUser(usuario);
      this.router.navigateByUrl('/home');
    }
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
