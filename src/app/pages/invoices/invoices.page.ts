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

  invoices: Observable<Invoice[]>;

  invoicesFilter: Invoice[] = [];
  estado: boolean;

  constructor(
    public invoiceService: InvoiceService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.invoices = this.invoiceService.getInvoices();
  }

  /* Devuelve facturas según estado */
  invoiceStatus(estado: boolean) {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoicesFilter = data.filter((invoice) => invoice.estado === estado);
    });
    this.estado = !this.estado;
  }

  /* Redirección a edición de factura */
  goToEditInvoice(id?: string) {
    this.router.navigateByUrl(`/edit-invoice${id !== undefined ? '/' + id : ''}`);
  }

  /* Eliminación de factura */
  deleteInvoice(id: string) {
    this.invoiceService.deleteInvoice(id);
  }

  /* Confirmación eliminar factura */
  async presentAlertConfirm(invoice: Invoice) {
    const alert = await this.alertController.create({
      header: 'Delete Invoice',
      message: `La factura ${invoice.invoiceId} será eliminada.\n Pulse ok para continuar.`,
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
            this.deleteInvoice(invoice.invoiceId);
            console.log('Factura eliminada');
          },
        },
      ],
    });

    await alert.present();
  }
}
