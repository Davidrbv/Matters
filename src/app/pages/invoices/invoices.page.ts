import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
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
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.invoices = this.invoiceService.getInvoices();
    this.invoices.subscribe(data => this.invoicesFilter = data);
  }

  /* Devuelve facturas según estado */
  invoiceStatus(estado: boolean) {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoicesFilter = data.filter((invoice) => invoice.estado === estado);
    });
    this.estado = !this.estado;
  }

  /* Redirect to edit-invoice */
  goToEditInvoice(id?: string) {
    this.router.navigateByUrl(`/edit-invoice${id !== undefined ? '/' + id : ''}`);
  }

  /* Eliminación de factura */
  deleteInvoice(id: string) {
    this.invoiceService.deleteInvoice(id);
  }

  /* Ventana emergente de opciones sobre empleado */

  async presentActionSheet(invoice : Invoice) {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.presentAlertConfirm(invoice);
          },
        },
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            this.goToEditInvoice(invoice.invoiceId)
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.presentToast('Cancel action...')
          },
        },
      ],
    });

    await actionSheet.present();
  }

  /* Confirmacion eleminación invoice */
  async presentAlertConfirm(invoice: Invoice) {
    const alert = await this.alertController.create({
      header: `Invoice code:  ${invoice.codigo}`,
      message: `The invoice will be deleted. ¿Are you sure?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Action cancelled..');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.invoiceService.deleteInvoice(invoice.invoiceId);
            this.presentToast('Delete invoice..');
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
