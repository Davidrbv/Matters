import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Invoice } from '../model/invoice';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  facturas: Invoice[] = [];

  facturaCounter: number = 0;

  constructor() {
    this.getInvoiceFromStorage().then((data) => (this.facturas = data));
    this.getInvoiceCounterFromStorage().then((data) => (this.facturaCounter = data));
  }

  /* Recupera una factura */

  getInvoice(id: number): Observable<Invoice> {
    return of({ ...this.facturas.filter((t) => t.id === id)[0] });
  }

  /* Graba factura en array y llamada a Storage */

  async saveInvoice(factura: Invoice): Promise<Boolean> {
    if (factura.id === undefined) {
      factura.id = this.facturaCounter++;
      this.facturas.push(factura);
    } else {
      this.deleteInvoice(factura.id);
      this.facturas.push(factura);
    }
    await this.saveInvoiceInToStorage();
    await this.saveInvoiceCounterInToStorage();
    return true;
  }

  /* Eliminamos factura grabando un array nuevo sin la factura borrada */

  async deleteInvoice(id: number): Promise<Boolean> {
    this.facturas = this.facturas.filter((t) => t.id !== id);
    return await this.saveInvoiceInToStorage();
  }

  /* Grabamos factura en storage */

  async saveInvoiceInToStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'factura',
      value: JSON.stringify(this.facturas),
    });
    return true;
  }

  /* Grabamos contador de facturas en storage */

  async saveInvoiceCounterInToStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'facturaCounter',
      value: this.facturaCounter.toString(),
    });
    return true;
  }

  /* Obtener facturas almacenadas en Storage */

  async getInvoiceFromStorage(): Promise<Invoice[]> {
    const retorno = await Storage.get({ key: 'factura' });
    return JSON.parse(retorno.value) ? JSON.parse(retorno.value) : [];
  }

  /* Obtener el contador de facturas del Storage */
  
  async getInvoiceCounterFromStorage(): Promise<number> {
    const tc = await Storage.get({ key: 'facturaCounter' });
    return Number.isInteger(+tc.value) ? +tc.value : 0;
  }
}
