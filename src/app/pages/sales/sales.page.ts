import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Sale } from 'src/app/model/sale';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage {
  sales: Observable<Sale[]>;
  min: number = 0;
  max: number = 0;

  constructor(public saleService: SaleService, private router: Router) {
    this.sales = this.saleService.getSales();
  }

  goToSaleRegister(id?: string) {
    this.router.navigateByUrl(`/sales-register${id !== undefined ? '/' + id : ''}`);
  }

  /* Devuelve las ventas en el rango indicado sobre el total de la venta. */

  //TODO: ESTO NO VA...INUTIL....REPIENSALO
  getSalesRange() {
    this.sales = this.saleService.getSales();
    if (this.min !== null && (this.max === null || this.max === 0)) {
      this.sales.subscribe((data) => {
        this.sales = of(data.filter((sale) => sale.total >= this.min));
      });
    }else if (this.max !== null && this.min === null) {
      this.sales.subscribe((data) => {
        this.sales = of(data.filter((sale) => sale.total >= 0 && sale.total <= this.max));
      });
    }else if ((this.min === null && this.max === null) || (this.min === 0 && this.max === 0)) {
      this.sales = this.saleService.getSales();
    }
    this.sales.subscribe((data) => {
      this.sales = of(data.filter((sale) => sale.total >= this.min && sale.total <= this.max));
    });
  }
}
