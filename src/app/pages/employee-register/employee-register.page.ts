import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.page.html',
  styleUrls: ['./employee-register.page.scss'],
})
export class EmployeeRegisterPage implements OnInit {

  empleado : Employee = {
    id : undefined,
    nombre: '',
    puesto: '',
    salario: undefined,
    email: '',
    imagen: '',
    telefono: ''
  };

  constructor(private dataService: DataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertController: AlertController) { }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null){
      //Metemos un + en el id para convertirlo en Int, ya que nos llega como string
      this.dataService.getEmployee(+id).subscribe(
        data => {this.empleado = data;
          console.log(data);}
      );
    }
  }


  saveEmployee(){
    console.log(this.empleado);
    this.dataService.saveEmployee(this.empleado);
    this.router.navigateByUrl('/employees');
  }

  goEmployees(){
    this.router.navigateByUrl('/employees');
  }

  async presentAlertConfirm(empleado : Employee){
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
          console.log('Eliminación cancelada.');        
        }
      },
        {
          text: 'Ok',
          handler: () => {
            this.dataService.deleteEmployee(empleado.id);
            console.log("Empleado eliminado");
            this.router.navigateByUrl('/employees');
            
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
