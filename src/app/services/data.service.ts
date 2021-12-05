import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable, of } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})

export class DataService{

  empleados : Employee [] = [];

  employeeCounter: number = 0;

  constructor(private http: HttpClient) { 

    //Almacenamos en tasks la promesa que devuelve el metodo, que es un array
    this.getEmployeesFromStorage().then(
      data => this.empleados = data
    );
    //Almacenamos el contador de tareas que nos devuelve el método.
    this.getEmployeeCounterFromStorage().then(
      data => this.employeeCounter = data
    );
  }


  getEmployees(): Observable <Employee[]> {    
    return of(this.empleados);
  }

  getEmployee(id: number): Observable<Employee>{
    return of({...this.empleados.filter(t => t.id === id)[0]});
  }

  async saveEmployee(empleado: Employee): Promise<Boolean>{

    if(empleado.id == undefined){
      empleado.id = this.employeeCounter++; 
      this.empleados.push(empleado);
    }else{
      //Borramos antigua y pusheamos el nuevo
      this.deleteEmployee(empleado.id);
      this.empleados.push(empleado);
    }
    await this.saveEmployeeInToStorage();
    await this.saveEmployeeCounterInToStorage();
    return true;  
  }

  /* Eliminamos empleado grabando un array nuevo sin el empleado borrado */
  /* Si no quedan empleados en el array, reiniciamos el contador */

  async deleteEmployee(id: number): Promise<Boolean>{
    this.empleados = this.empleados.filter(empleado => empleado.id !== id);
    if(this.empleados.length == 0) this.employeeCounter = 0;
    await this.saveEmployeeCounterInToStorage();
    return await this.saveEmployeeInToStorage();
  }

  /* Grabamos empleado en storage */

  async saveEmployeeInToStorage(): Promise<Boolean>{
    await Storage.set({
      key: 'empleados',
      value: JSON.stringify(this.empleados),
    });
    return true;
  }

  /* Grabamos contador en storage */

  async saveEmployeeCounterInToStorage(): Promise<Boolean>{
    await Storage.set({
      key: 'employeeCounter',
      value: this.employeeCounter.toString()
    });
    return true;
  }


  /* Obtener empleados del disco */

  async getEmployeesFromStorage(): Promise<Employee[]>{
    const retorno = await Storage.get({ key: 'empleados' });
    return JSON.parse(retorno.value) ? JSON.parse(retorno.value) : [];
  }

  /* Obtener el contador del disco */
  async getEmployeeCounterFromStorage(): Promise<number>{
    const tc = await Storage.get({ key: 'employeeCounter' });
    return Number.isInteger(+tc.value) ? + tc.value : 0;
  }
}

