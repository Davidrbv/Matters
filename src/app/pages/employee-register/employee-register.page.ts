import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.page.html',
  styleUrls: ['./employee-register.page.scss'],
})
export class EmployeeRegisterPage implements OnInit {
  empleado: Employee = {
    id: undefined,
    nombre: '',
    puesto: '',
    salario: undefined,
    email: '',
    imagen: '',
    telefono: '',
    genero: '',
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.dataService.getEmployee(+id).subscribe((data) => {
        this.empleado = data;
      });
    }
  }

  /* Grabamos nuevo empleado */
  saveEmployee() {
    this.presentToast('Guardando usuario..');
    this.dataService.saveEmployee(this.empleado);
    this.router.navigateByUrl('/employees');
  }

  /* Regresamos a la tabla de empleados */
  goEmployees() {
    this.presentToast('Volviendo..');
    this.router.navigateByUrl('/employees');
  }

  /* Confirmación de eliminación */
  async presentAlertConfirm(empleado: Employee) {
    const alert = await this.alertController.create({
      header: `${empleado.nombre}`,
      subHeader: `Con id: ${empleado.id}`,
      message: `Será eliminado. ¿Está seguro?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Acción cancelada..');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.dataService.deleteEmployee(empleado.id);
            this.presentToast('Eliminando usuario..');
            this.router.navigateByUrl('/employees');
          },
        },
      ],
    });

    await alert.present();
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
