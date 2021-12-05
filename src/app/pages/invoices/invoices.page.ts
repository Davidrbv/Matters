import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Invoice } from 'src/app/model/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {
  facturas: Invoice[] = [];
  hayFactura: Boolean;

  constructor(
    public invoiceService: InvoiceService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  /* Recuperamos facturas de Storage */
  getInvoices() {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.facturas = data;
    });
  }

  /* Redirección a edición de factura */
  goToEditInvoice(id?: number) {
    this.router.navigateByUrl(`/edit-invoice${id !== undefined ? '/' + id : ''}`);
  }

  /* Eliminación de factura */
  deleteInvoice(id: number) {
    this.invoiceService.deleteInvoice(id);
  }

  /* async haveInvoices() {
    return (await this.invoiceService.getInvoiceFromStorage()).length > 0;
  } */

  /* Confirmación eliminar factura */
  async presentAlertConfirm(factura: Invoice) {
    const alert = await this.alertController.create({
      header: 'Delete Invoice',
      message: `La factura ${factura.id} será eliminada.\n Pulse ok para continuar.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado.');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.deleteInvoice(factura.id);
            console.log('Factura eliminada');
          },
        },
      ],
    });

    await alert.present();
  }
}
