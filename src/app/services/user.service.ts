import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';
import { Storage } from '@capacitor/storage';
import { HttpClient } from '@angular/common/http';
import { Module } from 'src/app/interfaces/module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usuarios: User[] = [];

  usuarioCounter: number = 0;

  constructor(private http: HttpClient) {
    this.getUserFromStorage().then((data) => (this.usuarios = data));
    this.getUserCounterFromStorage().then((data) => (this.usuarioCounter = data));
  }

  /* Modulos que ha adquirido el cliente/usuario */

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>('../assets/modules.json');
  }

  /* Recogemos usuario */

  getUser(id: number): Observable<User> {
    return of({ ...this.usuarios.filter((t) => t.id === id)[0] });
  }

  /* Guardar usuario en array y Storage*/

  async saveUser(user: User): Promise<Boolean> {
    if (user.id == undefined) {
      user.id = this.usuarioCounter++;
      this.usuarios.push(user);
    } else {
      this.deleteUser(user.id);
      this.usuarios.push(user);
    }
    await this.saveUserInToStorage();
    await this.saveUserCounterInToStorage();
    return true;
  }

  /* Elimina usuario de array y graba en Storage*/
  async deleteUser(id: number): Promise<Boolean> {
    this.usuarios = this.usuarios.filter((t) => t.id !== id);
    return await this.saveUserInToStorage();
  }

  /* Guardar usuario en storage*/
  async saveUserInToStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'usuario',
      value: JSON.stringify(this.usuarios),
    });
    return true;
  }

  /* Guarda id usuario en Storage */
  async saveUserCounterInToStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'usuarioCounter',
      value: this.usuarioCounter.toString(),
    });
    return true;
  }

  /* Obtiene usuarios de Storage */
  async getUserFromStorage(): Promise<User[]> {
    const retorno = await Storage.get({ key: 'usuario' });
    return JSON.parse(retorno.value) ? JSON.parse(retorno.value) : [];
  }

  /* Obtiene contador de usuario de Storage */
  async getUserCounterFromStorage(): Promise<number> {
    const tc = await Storage.get({ key: 'usuarioCounter' });
    return Number.isInteger(+tc.value) ? +tc.value : 0;
  }
}
