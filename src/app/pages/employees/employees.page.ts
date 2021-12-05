import { AfterViewInit, Component, OnInit } from '@angular/core';
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

  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  /* Recuperamos empleados del Storage */
  getEmployees() {
    return this.dataService.getEmployeesFromStorage().then((data) => {
      this.employees = data;
    });
  }

  /* Filtro de empleados. Busca referencias al escribir en el Search */
  async getBusqueda(event) {
    const empleados = await this.dataService.getEmployeesFromStorage();
    const porNombre = empleados.filter(
      (empleado) =>
        empleado.nombre.includes(event.detail.value) ||
        empleado.puesto.includes(event.detail.value) ||
        empleado.email.includes(event.detail.value) ||
        empleado.genero.includes(event.detail.value)
    );
    this.employees = porNombre;
  }

  /* Redirección a edición de empleados */
  goEmployeesRegister(id?: number) {
    this.router.navigateByUrl(`/employee-register${id !== undefined ? '/' + id : ''}`);
  }
}
