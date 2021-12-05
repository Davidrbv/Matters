import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Sale } from 'src/app/model/sale';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sales-register',
  templateUrl: './sales-register.page.html',
  styleUrls: ['./sales-register.page.scss'],
})
export class SalesRegisterPage implements OnInit {
  sale: Sale = {
    id: undefined,
    fecha: new Date(),
    efectivo: undefined,
    tarjeta: undefined,
    total: undefined,
  };

  constructor(
    private saleService: SaleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.saleService.getSale(+id).subscribe((data) => {
        this.sale = data;
      });
    }
  }

  saveSale() {
    if (this.sale.efectivo === undefined || this.sale.tarjeta === undefined) {
      this.presentToast('Introduzca cantidades..');
    } else {
      this.sale.total = this.sale.efectivo + this.sale.tarjeta;
      this.presentToast('Registrando entrada..');
      this.saleService.saveSale(this.sale);
      this.router.navigateByUrl('/sales');
    }
  }

  goSales() {
    this.presentToast('Cancelando acciones..');
    this.router.navigateByUrl('/sales');
  }

  /* Confirmación de eliminación */
  async presentAlertConfirm(venta: Sale) {
    const alert = await this.alertController.create({
      header: `Fecha: ${venta.fecha}`,
      subHeader: `Id: ${venta.id}`,
      message: `Será eliminada. ¿Está seguro?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Acción cancelada..');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.presentToast('Eliminando venta..');
            this.saleService.deleteSale(venta.id);
            this.router.navigateByUrl('/sales');
          },
        },
      ],
    });

    await alert.present();
  }

  /* Presentacion de acciones realizadas */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 600,
      position: 'bottom',
      animated: true,
      color: 'dark  ',
    });
    toast.present();
  }
}
