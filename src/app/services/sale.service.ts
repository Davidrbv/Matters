import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sale } from '../model/sale';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  sales : Sale [] = [];

  salesCounter : number = 0;

  constructor() { 

    //Almacenamos en tasks la promesa que devuelve el metodo, que es un array
    this.getSalesFromStorage().then(
      data => this.sales = data
    );
    //Almacenamos el contador de tareas que nos devuelve el método.
    this.getSalesCounterFromStorage().then(
      data => this.salesCounter = data
    );
  }

  getSales(): Observable <Sale[]> {    
    return of(this.sales);
  }

  getSale(id: number): Observable<Sale>{
    return of({...this.sales.filter(t => t.id === id)[0]});
  }

  async saveSale(sale: Sale): Promise<Boolean>{

    if(sale.id == undefined){
      //Si no tiene id lo creo nuevo, en caso contrario, machacamos el que había.
      sale.id = this.salesCounter++; //asignamos e incrementamos
      this.sales.push(sale);
    }else{
      //Borramos antigua y pusheamos el nuevo
      this.deleteSale(sale.id);
      this.sales.push(sale);
    }
    await this.saveSaleInToStorage();
    await this.saveSaleCounterInToStorage();
    return true;  
  }

  /* Eliminamos empleado grabando un array nuevo sin el empleado borrado */

  async deleteSale(id: number): Promise<Boolean>{
    //Sustituimos el array por el que devuelve filter sin la tarea con el id que queremos eliminar
    this.sales = this.sales.filter(t => t.id !== id);
    //Grabamos el array al borrar para modificarlo en el storage
    return await this.saveSaleInToStorage();
  }

  /* Grabamos empleado en storage */

  async saveSaleInToStorage(): Promise<Boolean>{
    //Espera a que este grabada la informacion para devolver la promesa booleano. 
    await Storage.set({
      key: 'sales',
      value: JSON.stringify(this.sales), //Pasamos el array a objeto json
    });
    return true;
  }

  /* Grabamos contador en storage */

  async saveSaleCounterInToStorage(): Promise<Boolean>{
    await Storage.set({
      key: 'salesCounter',
      value: this.salesCounter.toString()
    });
    return true;
  }


  /* Obtener empleados del disco */

  async getSalesFromStorage(): Promise<Sale[]>{
    const retorno = await Storage.get({ key: 'sales' });
    //Usamos Jsonparse para pasar el objeto a texto json
    return JSON.parse(retorno.value) ? JSON.parse(retorno.value) : [];
  }

  /* Obtener el contador del disco */
  async getSalesCounterFromStorage(): Promise<number>{
    //Storage devuelve un tipo de objeto llamado getResult que hay que parsear.
    //Almacenamos en value la informacion asociada a la clave taskCounter
    const tc = await Storage.get({ key: 'salesCounter' });
    //En este caso no necesitamos JsonParse porque es un dato simple. Con el + lo conviertes en número
    //Parseamos value con + para que sea entero. También podría hacerse con parseInt()
    return Number.isInteger(+tc.value) ? + tc.value : 0;
  }
}
