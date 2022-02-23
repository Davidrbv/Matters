import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/interfaces/module';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Invoice } from 'src/app/model/invoice';
import { Observable } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  modulos: Module[];
  user: User = {} as User;
  users: User[];
  invoices : Invoice[];
  pending : number;

  constructor(
    private userService: UserService,
    private router: Router,
    private invoiceService : InvoiceService
  ) {}

 
  ngOnInit() {
    
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.user = this.users[0];   
    });

    this.getmodules();
    this.invoiceService.getInvoices().subscribe( data => {
      this.pending = data.length;
    })
  }

  /* Recuperamos modulos de usuarios */
  getmodules() {
    this.userService.getModules().subscribe((data) => {
      this.modulos = data;
    });
  }

  /* Redirección a edición de usuario */
  goToEditeUser() {
    this.router.navigateByUrl(`/edit-user`);
  }

  /* Redirección a modulo */
  goTo(module: Module) {
    this.router.navigateByUrl(`/${module.redirecTo}`);
  }

}
