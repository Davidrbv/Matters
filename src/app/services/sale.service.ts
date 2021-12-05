import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sale } from '../model/sale';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  sales: Sale[] = [];
  salesCounter: number = 0;

  constructor() {
    this.getSalesFromStorage().then((data) => (this.sales = data));

    this.getSalesCounterFromStorage().then((data) => (this.salesCounter = data));
  }

  /* Devuelve venta de array */
  getSale(id: number): Observable<Sale> {
    return of({ ...this.sales.filter((t) => t.id === id)[0] });
  }

  /* Devuelve ventas donde el total se encuentra entre min y max */

  getSalesRange(min: number, max: number): Sale[] {
    if (min !== null && (max === null || max === 0)) {
      return this.sales.filter((sale) => sale.total >= min);
    }
    if (max !== null && min === null) {
      return this.sales.filter((sale) => sale.total >= 0 && sale.total <= max);
    }
    if ((min === null && max === null) || (min === 0 && max === 0)) {
      return this.sales;
    }
    return this.sales.filter((sale) => sale.total >= min && sale.total <= max);
  }

  /* Grabamos venta en array y Storage */

  async saveSale(sale: Sale): Promise<Boolean> {
    if (sale.id == undefined) {
      sale.id = this.salesCounter++;
      sale.total = sale.efectivo + sale.tarjeta;
      this.sales.push(sale);
    } else {
      this.deleteSale(sale.id);
      this.sales.push(sale);
    }
    await this.saveSaleInToStorage();
    await this.saveSaleCounterInToStorage();
    return true;
  }

  /* Eliminamos venta grabando un array nuevo sin la venta borrada */

  async deleteSale(id: number): Promise<Boolean> {
    this.sales = this.sales.filter((t) => t.id !== id);
    return await this.saveSaleInToStorage();
  }

  /* Grabamos venta en storage */

  async saveSaleInToStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'sales',
      value: JSON.stringify(this.sales),
    });
    return true;
  }

  /* Grabamos contador de ventas en storage */

  async saveSaleCounterInToStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'salesCounter',
      value: this.salesCounter.toString(),
    });
    return true;
  }

  /* Obtener venta del Storage */

  async getSalesFromStorage(): Promise<Sale[]> {
    const retorno = await Storage.get({ key: 'sales' });
    return JSON.parse(retorno.value) ? JSON.parse(retorno.value) : [];
  }

  /* Obtener el contador de ventas del Storage */

  async getSalesCounterFromStorage(): Promise<number> {
    const tc = await Storage.get({ key: 'salesCounter' });
    return Number.isInteger(+tc.value) ? +tc.value : 0;
  }
}
