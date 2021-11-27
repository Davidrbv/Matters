import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Invoice } from 'src/app/model/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {

  facturas : Invoice [] = [];

  constructor(private invoiceService: InvoiceService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {

    this.getInvoices();
    
  }

  getInvoices(){
    return this.invoiceService.getInvoiceFromStorage().then(data => {
      this.facturas = data;
    });
  }

  goToEditInvoice(id? : number){
    this.router.navigateByUrl(`/edit-invoice${id !== undefined ? '/' + id : ''}`);
  }

  deleteInvoice(id: number){
    this.invoiceService.deleteInvoice(id);
  }

  async presentAlertConfirm(factura : Invoice){

    const alert = await this.alertController.create({
      header: 'Delete Invoice',
      message: `La factura ${factura.id} será eliminada.\n Pulse ok para continuar.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado.');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.deleteInvoice(factura.id); //En el okay llamamos al metodo delete para eleiminar la tarea
            console.log('Factura eliminada');
          }
        }
      ]
    });

    await alert.present();
  }

}
