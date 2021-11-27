import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  employees: Employee[] = [];

  constructor(private dataService: DataService,
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

}
