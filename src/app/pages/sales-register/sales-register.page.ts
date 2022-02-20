import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Sale } from 'src/app/model/sale';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sales-register',
  templateUrl: './sales-register.page.html',
  styleUrls: ['./sales-register.page.scss'],
})
export class SalesRegisterPage implements OnInit {

  sale: Sale = {} as Sale;
  edit: boolean = false;

  constructor(
    private saleService: SaleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.saleService.getSale(id).subscribe((data) => {
        this.sale = data;
        this.edit = true;
      });
    }
  }

  /* Graba venta  */
  saveSale() {
    if (this.sale.efectivo === undefined || this.sale.tarjeta === undefined) {
      this.presentToast('Fild the fields..');
    } else {
      this.sale.total = this.sale.efectivo + this.sale.tarjeta;
      this.presentToast('Sale register..');

      if(this.edit) this.saleService.updateSale(this.sale);
      else this.saleService.addSale(this.sale);

      this.router.navigateByUrl('/sales');
    }
  }

  /* Redirección a modulo ventas */
  goSales() {
    this.presentToast('Cancel action..');
    this.router.navigateByUrl('/sales');
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
