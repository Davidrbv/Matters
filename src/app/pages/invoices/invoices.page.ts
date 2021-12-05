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
  invoices: Invoice[] = [];
  invoicesFilter: Invoice[] = [];
  estado: boolean;

  constructor(
    public invoiceService: InvoiceService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.getInvoices();
  }

  /* Recuperamos facturas de Storage */
  getInvoices() {
    this.invoiceService.getInvoiceFromStorage().then((data) => {
      this.invoices = data;
      this.invoicesFilter = data;
    });
  }

  /* Devuelve facturas según estado */
  invoiceStatus(estado: boolean) {
    this.invoiceService.getInvoiceFromStorage().then((data) => {
      this.invoicesFilter = data.filter((invoice) => invoice.estado === estado);
    });
    this.estado = !this.estado;
  }

  /* Redirección a edición de factura */
  goToEditInvoice(id?: number) {
    this.router.navigateByUrl(`/edit-invoice${id !== undefined ? '/' + id : ''}`);
  }

  /* Eliminación de factura */
  deleteInvoice(id: number) {
    this.invoiceService.deleteInvoice(id);
  }

  /* Confirmación eliminar factura */
  async presentAlertConfirm(invoice: Invoice) {
    const alert = await this.alertController.create({
      header: 'Delete Invoice',
      message: `La factura ${invoice.id} será eliminada.\n Pulse ok para continuar.`,
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
            this.deleteInvoice(invoice.id);
            console.log('Factura eliminada');
          },
        },
      ],
    });

    await alert.present();
  }
}
