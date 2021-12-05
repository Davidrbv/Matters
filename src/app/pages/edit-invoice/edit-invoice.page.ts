import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Invoice } from 'src/app/model/invoice';
import { User } from 'src/app/model/user';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.page.html',
  styleUrls: ['./edit-invoice.page.scss'],
})
export class EditInvoicePage implements OnInit {
  factura: Invoice = {
    id: undefined,
    codigo: '',
    fecha: new Date(),
    cantidad: undefined,
    proveedor: '',
    estado: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  /* Inicio de modulo con id de empleado */
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.invoiceService.getInvoice(+id).subscribe((data) => {
        this.factura = data;
      });
    }
  }

  /* Graba factura */
  saveInvoice() {
    this.presentToast('Guardando factura..');
    this.invoiceService.saveInvoice(this.factura);
    this.router.navigateByUrl('/invoices');
  }

  /* Redirección a modulo facturas */
  goInvoices() {
    this.presentToast('Cancelando cambios realizados..');
    this.router.navigateByUrl('/invoices');
  }

  /* Confirmacion eleminación factura */
  async presentAlertConfirm(factura: Invoice) {
    const alert = await this.alertController.create({
      header: `Código de Factura:  ${factura.codigo}`,
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
            this.invoiceService.deleteInvoice(factura.id);
            this.presentToast('Eliminando factura..');
            this.router.navigateByUrl('/invoices');
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
