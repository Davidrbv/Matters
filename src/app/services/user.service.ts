import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  usuarios: User[] = [];

  usuarioCounter: number = 0;

  constructor() {
    
    /* Cargamos informacion usuario */
    
    this.getUserFromStorage().then(
      data => this.usuarios = data
    );

    /* Cargamos información contador usuario */

    this.getUserCounterFromStorage().then(
      data => this.usuarioCounter = data
    );
    
  }

  getUsers(): Observable <User[]> {    
    return of(this.usuarios);
  }

  /* Guardar usuario */

  async saveUser(user: User): Promise<Boolean>{

    if(user.id == undefined){
      user.id = this.usuarioCounter++;
      this.usuarios.push(user);
    }else{
      this.deleteUser(user.id);
      this.usuarios.push(user);
    }
    await this.saveUserInToStorage();
    await this.saveUserCounterInToStorage();
    return true;  
  }

  /* Eliminar usuario de array*/

  async deleteUser(id: number): Promise<Boolean>{
    this.usuarios = this.usuarios.filter(t => t.id !== id);
    return await this.saveUserInToStorage();
  }

  /* Guardar usuario en storage*/

  async saveUserInToStorage(): Promise<Boolean>{
    await Storage.set({
      key: 'usuarios',
      value: JSON.stringify(this.usuarios),
    });
    return true;
  }

  /* Guardar id usuario en Storage */

  async saveUserCounterInToStorage(): Promise<Boolean>{
    await Storage.set({
      key: 'usuarioCounter',
      value: this.usuarioCounter.toString()
    });
    return true;
  }


  /* Obtener usuarios de Storage */

  async getUserFromStorage(): Promise<User[]>{
    const retorno = await Storage.get({ key: 'usuario' });
    return JSON.parse(retorno.value) ? JSON.parse(retorno.value) : [];
  }

  /* Obtener contador de usuario de Storage */

  async getUserCounterFromStorage(): Promise<number>{
    const tc = await Storage.get({ key: 'usuarioCounter' });
    return Number.isInteger(+tc.value) ? + tc.value : 0;
  }
}
