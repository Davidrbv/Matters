import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable, of } from 'rxjs';
import { Module } from 'src/app/interfaces/module';
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

  /* Recogemos empleados de prueba de json */
  /* getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>('../assets/employees.json');
  } */
  
  /* Modulos con los que cuenta la aplicacion. 4 en este caso. */
  getModules(): Observable<Module[]>{
    return this.http.get<Module[]>('../assets/modules.json');
  }


  getEmployees(): Observable <Employee[]> {    
    return of(this.empleados);
  }

  getEmployee(id: number): Observable<Employee>{
    return of({...this.empleados.filter(t => t.id === id)[0]});
  }

  async saveEmployee(empleado: Employee): Promise<Boolean>{

    if(empleado.id == undefined){
      //Si no tiene id lo creo nuevo, en caso contrario, machacamos el que había.
      empleado.id = this.employeeCounter++; //asignamos e incrementamos
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

  async deleteEmployee(id: number): Promise<Boolean>{
    //Sustituimos el array por el que devuelve filter sin la tarea con el id que queremos eliminar
    this.empleados = this.empleados.filter(t => t.id !== id);
    //Grabamos el array al borrar para modificarlo en el storage
    return await this.saveEmployeeInToStorage();
  }

  /* Grabamos empleado en storage */

  async saveEmployeeInToStorage(): Promise<Boolean>{
    //Espera a que este grabada la informacion para devolver la promesa booleano. 
    await Storage.set({
      key: 'empleados',
      value: JSON.stringify(this.empleados), //Pasamos el array a objeto json
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
    //Usamos Jsonparse para pasar el objeto a texto json
    return JSON.parse(retorno.value) ? JSON.parse(retorno.value) : [];
  }

  /* Obtener el contador del disco */
  async getEmployeeCounterFromStorage(): Promise<number>{
    //Storage devuelve un tipo de objeto llamado getResult que hay que parsear.
    //Almacenamos en value la informacion asociada a la clave taskCounter
    const tc = await Storage.get({ key: 'employeeCounter' });
    //En este caso no necesitamos JsonParse porque es un dato simple. Con el + lo conviertes en número
    //Parseamos value con + para que sea entero. También podría hacerse con parseInt()
    return Number.isInteger(+tc.value) ? + tc.value : 0;
  }
}


