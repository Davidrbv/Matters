import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable, of } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  empleados: Employee[] = [];

  employeeCounter: number = 0;

  constructor() {
    this.getEmployeesFromStorage().then((data) => (this.empleados = data));
    this.getEmployeeCounterFromStorage().then((data) => (this.employeeCounter = data));
  }

  /* Recupera un empleado */

  getEmployee(id: number): Observable<Employee> {
    return of({ ...this.empleados.filter((t) => t.id === id)[0] });
  }

  /* Graba empleado en array y llamada a grabar en Storage */

  async saveEmployee(empleado: Employee): Promise<Boolean> {
    if (empleado.id == undefined) {
      empleado.id = this.employeeCounter++;
      this.empleados.push(empleado);
    } else {
      this.deleteEmployee(empleado.id);
      this.empleados.push(empleado);
    }
    await this.saveEmployeeInToStorage();
    await this.saveEmployeeCounterInToStorage();
    return true;
  }

  /* Eliminamos empleado grabando un array nuevo sin el empleado borrado */
  /* Si no quedan empleados en el array, reiniciamos el contador */

  async deleteEmployee(id: number): Promise<Boolean> {
    this.empleados = this.empleados.filter((empleado) => empleado.id !== id);
    if (this.empleados.length == 0) this.employeeCounter = 0;
    await this.saveEmployeeCounterInToStorage();
    return await this.saveEmployeeInToStorage();
  }

  /* Grabamos empleado en storage */

  async saveEmployeeInToStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'empleados',
      value: JSON.stringify(this.empleados),
    });
    return true;
  }

  /* Grabamos contador de empleado en storage */

  async saveEmployeeCounterInToStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'employeeCounter',
      value: this.employeeCounter.toString(),
    });
    return true;
  }

  /* Obtener empleados del Storage */

  async getEmployeesFromStorage(): Promise<Employee[]> {
    const retorno = await Storage.get({ key: 'empleados' });
    return JSON.parse(retorno.value) ? JSON.parse(retorno.value) : [];
  }

  /* Obtener el contador del Storage */

  async getEmployeeCounterFromStorage(): Promise<number> {
    const tc = await Storage.get({ key: 'employeeCounter' });
    return Number.isInteger(+tc.value) ? +tc.value : 0;
  }
}
