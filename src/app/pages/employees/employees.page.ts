import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/services/data.service';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {
  employees: Observable<Employee[]>;
  employeesFilter: Employee[] = [];
  nombre = '';

  constructor(public dataService: DataService,
              private router: Router,
              private actionSheetCtrl: ActionSheetController,
              private alertController: AlertController,
              private toastController: ToastController) {
    this.employees = this.dataService.getEmployees();
  }

  ngOnInit(): void {}

  /* Employee's filter */

  getBusqueda(event: any) {
    this.dataService.getEmployees().subscribe((data) => {
      this.employeesFilter = data.filter(
        (employee) =>
          employee.nombre.toUpperCase().includes(event.detail.value.toUpperCase()) ||
          employee.puesto.toUpperCase().includes(event.detail.value.toUpperCase()) ||
          employee.email.toUpperCase().includes(event.detail.value.toUpperCase()) ||
          employee.genero.toUpperCase().includes(event.detail.value.toUpperCase())
      );
      this.employees = of(this.employeesFilter);
    });
  }

  /* Employees's register refirect */
  goEmployeesRegister(id?: string) {
    this.router.navigateByUrl(`/employee-register${id !== undefined ? '/' + id : ''}`);
  }


  /* Window message */

  async presentActionSheet(employee : Employee) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `${employee.nombre.toUpperCase()}`,
      mode: 'ios',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          cssClass: 'rojo',
          handler: () => {
            this.presentAlertConfirm(employee);
          },
        },
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            this.goEmployeesRegister(employee.employeeId)
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.presentToast('Cancel action...')
          },
        },
      ],
    });

    await actionSheet.present();
  }

  /* Confirm delete */
  async presentAlertConfirm(employee: Employee) {
    const alert = await this.alertController.create({
      header: `${employee.nombre.toUpperCase()}`,
      message: `This employee was deleted. ¿Are you sure?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Cancel Action..');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.dataService.deleteEmployee(employee.employeeId);
            this.presentToast('Delete employee..');
            this.router.navigateByUrl('/employees');
          },
        },
      ],
    });

    await alert.present();
  }

  /* Show actions */
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
