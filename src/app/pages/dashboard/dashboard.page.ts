import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Module } from 'src/app/interfaces/module';
import { PopinfouserComponent } from 'src/app/components/popinfouser/popinfouser.component';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';

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
    password2:undefined
  };

  constructor(private popOverController: PopoverController,
              public  userService: UserService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {}

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null){
      this.userService.getUser(+id).subscribe(
        data => {this.user = data;}
      );
    }
    this.getmodules();
  }

  getmodules(){
    this.userService.getModules().subscribe(data => {
      this.modulos = data;
    })
  }

  goToEditeUser(id: number){
    this.router.navigateByUrl(`/edit-user${id !== undefined ? '/' + id : ''}`);
  }

  goTo(module : Module){
    this.router.navigateByUrl(`/${module.redirecTo}${this.user.id !== undefined ? '/' + this.user.id : ''}`)
  }

  async presentPopover(event: any) {
    const popover = await this.popOverController.create({
      component: PopinfouserComponent,
      cssClass: 'popOver',
      event,
      mode: 'ios',
      backdropDismiss: true,
      translucent: true,
      animated: true
      
    });
    await popover.present();
  }
}
