import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  employees: Observable<Employee[]>;
  employeesFilter : Employee[] = [];
  nombre = '';

  constructor(public dataService: DataService, private router: Router) {
    this.employees = this.dataService.getEmployees();
  }

  ngOnInit(): void {}


  /* Filtro de empleados. Busca referencias al escribir en el Search */

  getBusqueda(event : any) {

    this.dataService.getEmployees().subscribe((data) => {

      this.employeesFilter = data.filter(employee => 
      employee.nombre.includes(event.detail.value) ||
      employee.puesto.includes(event.detail.value) ||
      employee.email.includes(event.detail.value) ||
      employee.genero.includes(event.detail.value)
      )
      this.employees = of(this.employeesFilter);
    });  
  }
  
  /* Redirección a edición de empleados */
  goEmployeesRegister(id?: string) {
    this.router.navigateByUrl(`/employee-register${id !== undefined ? '/' + id : ''}`);
  }
}
