import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  users: Observable<User[]>;

  user: User = {} as User;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.userService.getUser(id).subscribe((data) => {
        this.user = data;
      });
    }
  }

  /* Comprueba validez de datos introducidos 
  compruebaUsuario(usuario: User): Boolean {
    if (usuario.email === '' || usuario.nombre === '' || usuario.password !== usuario.password2) return true;
    let repetido = this.users.filter((user) => {
      return user.nombre === usuario.nombre || user.email === usuario.email;
    });
    return !(repetido.length < 1);
  }*/

  /* Cambios en usuario */
  async saveChange(usuario: User) {
    if (usuario.password !== usuario.password2) {
      this.presentToast('Constraseñas no validas...');
    } else {
      this.presentToast('Realizando cambios...');
      await this.userService.addUser(usuario);
      this.router.navigateByUrl(`/dashboard${this.user.userId !== undefined ? '/' + this.user.userId : ''}`);
    }
  }

  /* Cancelación de cambios */
  cancelChange() {
    this.presentToast('Cambios cancelados..');
    this.router.navigateByUrl(`/dashboard${this.user.userId !== undefined ? '/' + this.user.userId : ''}`);
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
