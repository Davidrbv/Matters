import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario : User = {

    id: undefined,
    email: '',
    nombre: '',
    password: '',
    password2: ''
  };

  usuarios : User [] = [];

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    return this.userService.getUserFromStorage().then(data => {
      this.usuarios = data;
    });
  }

  compruebaUsuario(usuario: User): Boolean{
    let repetido = this.usuarios.filter(user => { 
      return (user.nombre === usuario.nombre || user.email === usuario.email)
    });
    return !(repetido.length < 1);
  }

  userRegister(usuario: User){
    this.getUsers();
    if(this.compruebaUsuario(usuario)){
      console.log('Usuario repetido');      
    }else{
      console.log('No repetido');     
      this.userService.saveUser(usuario);
      this.router.navigateByUrl('/home');
    }
  }
}
