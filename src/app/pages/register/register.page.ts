import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit() {

  }

  getUsers(){
    return this.userService.getUserFromStorage().then(data => {
      this.usuarios = data;
    });
  }

  compruebaUsuario(usuario: User): Boolean{
    const usuarios = new Set(this.usuarios);
    return usuarios.has(usuario);
  }

  userRegister(usuario){
    this.getUsers();
    if(this.compruebaUsuario(usuario)){
      console.log('Usuario repetido');      
    }else{
      console.log('No repetido');
      
      this.userService.saveUser(usuario);
    }
  }
}
