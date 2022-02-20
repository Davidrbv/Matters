import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.page.html',
  styleUrls: ['./employee-register.page.scss'],
})
export class EmployeeRegisterPage implements OnInit {

  employee: Employee = {} as Employee;
  edit : boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.dataService.getEmployee(id).subscribe((data) => {
        this.employee = data;
        this.edit = true;
      });
    }
  }

  /* Grabamos nuevo employee */
  saveEmployee() {
    if(this.employee.nombre == '' ||
       this.employee.puesto == '' ||
       this.employee.salario == undefined ||
       this.employee.email == '' ||
       this.employee.imagen == '' ||
       this.employee.telefono == '' ||
       this.employee.genero == ''){
         this.presentToast(`Fields must be filled in..`)
       }else{
          this.presentToast('Save user..');

          if(this.edit) this.dataService.updateEmployee(this.employee)
          else this.dataService.addEmployee(this.employee);

          this.router.navigateByUrl('/employees');
       }
    
  }

  /* Regresamos a la tabla de empleados */
  goEmployees() {
    this.presentToast('Come back..');
    this.router.navigateByUrl('/employees');
  }

  /* Presentacion de acciones realizadas */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 600,
      position: 'bottom',
      animated: true,
      color: 'dark  ',
    });
    toast.present();
  }
  
}
