import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from 'src/app/interfaces/module';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  modulos: Module[] = [];

  constructor(public authService : AuthService,
              private userService : UserService,
              private router : Router) {
                this.getmodules();              
              }

  ngOnInit() {}

  getmodules() {
    this.userService.getModules().subscribe((data) => {
      this.modulos = data;
    });
  }

  goToEditUser(){
    this.router.navigateByUrl('/edit-user');
  }

  goTo(module: Module) {
    this.router.navigateByUrl(`/${module.redirecTo}`);
  }
}
