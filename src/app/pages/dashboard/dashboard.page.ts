import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Module } from 'src/app/interfaces/module';
import { PopinfouserComponent } from 'src/app/components/popinfouser/popinfouser.component';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  modulos: Module[] = [];
  user: User = {} as User;
  users: User[];

  constructor(
    private popOverController: PopoverController,
    private userService: UserService,
    private router: Router
  ) {}

  /* Iniciamos Dashboard con id de usuario */
  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.user = this.users[0];
    });
    this.getmodules();
  }

  /* Recuperamos modulos de usuarios */
  getmodules() {
    this.userService.getModules().subscribe((data) => {
      this.modulos = data;
    });
  }

  /* Redirección a edición de usuario */
  goToEditeUser(id?: string) {
    this.router.navigateByUrl(`/edit-user${id !== undefined ? '/' + id : ''}`);
  }

  /* Redirección a modulo */
  goTo(module: Module) {
    this.router.navigateByUrl(`/${module.redirecTo}${this.user.userId !== undefined ? '/' + this.user.userId : ''}`);
  }

  /* PopOver navigation menu */
  async presentPopover(event: any) {
    const popover = await this.popOverController.create({
      component: PopinfouserComponent,
      cssClass: 'popOver',
      event,
      mode: 'ios',
      backdropDismiss: true,
      translucent: true,
      animated: true,
    });
    await popover.present();
  }
}
