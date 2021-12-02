import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario = {
    email: '',
    password: ''
  };

  usuarios : User [] = [];

  constructor(private router: Router,
              private userService: UserService) {}

  isUser(): Boolean{
    
    if(this.usuario.email === '' && this.usuario.password === '') return false;  
    
    this.getUsers();
    let coincide = this.usuarios.filter(user => {
      return (this.usuario.email === user.email && this.usuario.password === user.password)
    });

    return (coincide.length > 0)
  }

  login(){
    if(this.isUser()){
      this.router.navigateByUrl('/dashboard');
    }else {
      console.log("Usuario o contraseña incorrectos...");
    }  
  }

  getUsers(){
    return this.userService.getUserFromStorage().then(data =>
      this.usuarios = data);
  }

  goToRegister(){
    this.router.navigateByUrl("/register")
  }

}
