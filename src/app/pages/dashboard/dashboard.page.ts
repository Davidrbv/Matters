import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Module } from 'src/app/interfaces/module';
import { PopinfouserComponent } from 'src/app/components/popinfouser/popinfouser.component';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  modulos: Module[] = [];

  user: User = {
    id: undefined,
    email: '',
    nombre: '',
    password: undefined,
    password2: undefined,
  };

  constructor(
    private popOverController: PopoverController,
    public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /* Iniciamos Dashboard con id de usuario */
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.userService.getUser(+id).subscribe((data) => {
        this.user = data;
      });
    }
    this.getmodules();
  }

  /* Recuperamos modulos de usuarios */
  getmodules() {
    this.userService.getModules().subscribe((data) => {
      this.modulos = data;
    });
  }

  /* Redirección a edición de usuario */
  goToEditeUser(id: number) {
    this.router.navigateByUrl(`/edit-user${id !== undefined ? '/' + id : ''}`);
  }

  /* Redirección a modulo */
  goTo(module: Module) {
    this.router.navigateByUrl(`/${module.redirecTo}${this.user.id !== undefined ? '/' + this.user.id : ''}`);
  }

  /* PopOver menú navegación usuario */
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
