import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  employees: Employee[] = [];
  nombre = ''; 

  constructor(public dataService: DataService,
              private router:Router) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(){
    return this.dataService.getEmployeesFromStorage().then(data => {
      this.employees = data;
    });
  }

  goEmployeesRegister(id? : number){
    this.router.navigateByUrl(`/employee-register${id !== undefined ? '/' + id : ''}`);
  }

  buscar(event){
    this.nombre = event.detail.value;
    this.filtroNombres(this.nombre);
  }

  filtroNombres(nombre: string){
    return this.dataService.getEmployeesFromStorage().then(data => {
      this.employees = data;
    });
  }
}
