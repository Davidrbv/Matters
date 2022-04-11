import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Sale } from 'src/app/model/sale';
import { SaleService } from 'src/app/services/sale.service';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  sales: Observable<Sale[]>;
  salesFilter: Sale[];
  min: number = 0;
  max: number = 0;

  constructor(
    public saleService: SaleService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.sales = this.saleService.getSales();
  }

  goToSaleRegister(id?: string) {
    this.router.navigateByUrl(`/sales-register${id !== undefined ? '/' + id : ''}`);
  }

  /* Get all Sales */
  getAll() {
    this.sales = this.saleService.getSales();
  }

  /* Sales's filter */
  getSalesRange() {
    if (this.min === 0 && this.max === 0) this.sales = this.saleService.getSales();
    else {
      this.saleService.getSales().subscribe((data) => {
        this.salesFilter = data.filter((sale) => sale.total >= this.min && sale.total <= this.max);
        this.sales = of(this.salesFilter);
      });
    }
  }

  /* Show window's message */
  async presentActionSheet(sale: Sale) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `${sale.fecha}`,
      mode: 'ios',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          cssClass: 'rojo',
          handler: () => {
            this.presentAlertConfirm(sale);
          },
        },
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            this.goToSaleRegister(sale.saleId);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.presentToast('Cancel action...');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  /* Delete sale confirm */

  async presentAlertConfirm(venta: Sale) {
    const alert = await this.alertController.create({
      header: `Date: ${venta.fecha}`,
      subHeader: `Id: ${venta.saleId}`,
      message: `This sale will be deleted. Are you sure?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Action canceled..');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.presentToast('Deleting sale..');
            this.saleService.deleteSale(venta.saleId);
            this.router.navigateByUrl('/sales');
          },
        },
      ],
    });

    await alert.present();
  }

  /* Show actions */
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
