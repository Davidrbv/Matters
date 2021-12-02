import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Invoice } from '../model/invoice';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService{

  facturas : Invoice [] = [];

  facturaCounter : number = 0;

  constructor() {

    /* Cargamos informacion de facturas */
    this.getInvoiceFromStorage().then(
      data => this.facturas = data
    );
    /* Cargamos información contador facturas */
    this.getInvoiceCounterFromStorage().then(
      data => this.facturaCounter = data
    );
  }


  getInvoices(): Observable <Invoice[]> {    
    return of(this.facturas);
  }

  getInvoice(id: number): Observable<Invoice>{
    return of({...this.facturas.filter(t => t.id === id)[0]});
  }

  async saveInvoice(factura: Invoice): Promise<Boolean>{
    
    if(factura.id == undefined){
      //Si no tiene id lo creo nuevo, en caso contrario, machacamos el que había.
      factura.id = this.facturaCounter++;
      this.facturas.push(factura);
    }else{
      //Borramos factura antigua y pusheamos el nuevo
      this.deleteInvoice(factura.id);
      this.facturas.push(factura);
    }
    await this.saveInvoiceInToStorage();
    await this.saveInvoiceCounterInToStorage();
    return true;  
  }

  /* Eliminamos empleado grabando un array nuevo sin el empleado borrado */

  async deleteInvoice(id: number): Promise<Boolean>{
    this.facturas = this.facturas.filter(t => t.id !== id);
    return await this.saveInvoiceInToStorage();
  }

  /* Grabamos empleado en storage */

  async saveInvoiceInToStorage(): Promise<Boolean>{
    await Storage.set({
      key: 'factura',
      value: JSON.stringify(this.facturas),
    });
    return true;
  }

  /* Grabamos contador de facturas en storage */

  async saveInvoiceCounterInToStorage(): Promise<Boolean>{
    await Storage.set({
      key: 'facturaCounter',
      value: this.facturaCounter.toString()
    });
    return true;
  }


  /* Obtener facturas almacenadas en Storage */

  async getInvoiceFromStorage(): Promise<Invoice[]>{
    const retorno = await Storage.get({ key: 'factura' });

    return JSON.parse(retorno.value) ? JSON.parse(retorno.value) : [];
  }

  /* Obtener el contador de facturas del disco */
  
  async getInvoiceCounterFromStorage(): Promise<number>{

    const tc = await Storage.get({ key: 'facturaCounter' });

    return Number.isInteger(+tc.value) ? + tc.value : 0;
  }
}
