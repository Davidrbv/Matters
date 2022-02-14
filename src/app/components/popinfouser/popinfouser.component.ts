import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-popinfouser',
  templateUrl: './popinfouser.component.html',
  styleUrls: ['./popinfouser.component.scss'],
})
export class PopinfouserComponent implements OnInit {

  opciones = ['employees', 'invoices', 'sales', 'accounting'];

  constructor(private router: Router,
              private authService : AuthService) {}

  ngOnInit() {}

  redirecTo(item) {
    this.router.navigateByUrl('/' + item);
  }

  logOut(){
    this.authService.logOut();
  }
}
