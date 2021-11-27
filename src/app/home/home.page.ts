import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  goToDashboard(){
    this.router.navigateByUrl("/dashboard")
  }

  goToRegister(){
    this.router.navigateByUrl("/register")
  }

}
