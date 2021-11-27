import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Module } from 'src/app/interfaces/module';
import { Observable } from 'rxjs';
import { PopinfouserComponent } from 'src/app/components/popinfouser/popinfouser.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  modulos: Observable<Module[]>;

  constructor( private popOverController: PopoverController,
               private dataService: DataService ) { }

  ngOnInit() {
    this.modulos = this.dataService.getModules();
  }

  async presentPopover(event: any) {
    const popover = await this.popOverController.create({
      component: PopinfouserComponent,
      cssClass: 'my-custom-class',
      event,
      mode: 'ios',
      backdropDismiss: true, //Esto es para que el popover no se cierre si no se interactua con el.
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();

    console.log('Padre: ',data);

  }

}
