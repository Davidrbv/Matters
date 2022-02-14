import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Invoice } from 'src/app/model/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.page.html',
  styleUrls: ['./edit-invoice.page.scss'],
})
export class EditInvoicePage implements OnInit {

  invoice: Invoice = {} as Invoice;
  edit : boolean = false;

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
      this.invoiceService.getInvoice(id).subscribe((data) => {
        this.invoice = data;
        this.edit = true;
      });
    }
  }

  /* Save invoice */
  saveInvoice() {
    if(this.invoice.codigo == '' ||
       this.invoice.fecha == null ||
       this.invoice.cantidad == null ||
       this.invoice.proveedor == '' ||
       this.invoice.estado == null){
        this.presentToast('Fields must be filled in..');
       }else{

        this.presentToast('Save invoice..');

        if(this.edit) this.invoiceService.updateInvoice(this.invoice);
        else this.invoiceService.addInvoice(this.invoice);

        this.router.navigateByUrl('/invoices');
       }  
  }

  /* Redirection Invoices Module */
  goInvoices() {
    this.presentToast('changes cancelled...');
    this.router.navigateByUrl('/invoices');
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
            this.presentToast('Action canceled..');
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
