import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sale } from 'src/app/model/sale';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  sales: Sale[] = [];
  min: number = 0;
  max: number = 0;

  constructor(public saleService: SaleService, private router: Router) {}

  ngOnInit() {
    this.getSales();
  }

  /* Recupera ventas de Storage */
  getSales() {
    return this.saleService.getSalesFromStorage().then((data) => {
      this.sales = data;
    });
  }

  /* Redirección a registro de ventas */
  goToSaleRegister(id?: number) {
    this.router.navigateByUrl(`/sales-register${id !== undefined ? '/' + id : ''}`);
  }

  /* Devuelve las ventas en el rango indicado sobre el total de la venta. */
  getSalesRange() {
    this.sales = this.saleService.getSalesRange(this.min, this.max);
  }
}
