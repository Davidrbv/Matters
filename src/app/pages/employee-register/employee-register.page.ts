import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/services/data.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.page.html',
  styleUrls: ['./employee-register.page.scss'],
})
export class EmployeeRegisterPage implements OnInit {

  employee: Employee = {} as Employee;
  edit: boolean = false;
  image : any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private photoService : PhotoService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.dataService.getEmployee(id).subscribe((data) => {
        this.employee = data;
        this.edit = true;
      });
    }
  }

  /* Save employee */
  saveEmployee() {
    if (
      this.employee.nombre === undefined ||
      this.employee.puesto === undefined ||
      this.employee.salario === undefined ||
      this.employee.email === undefined ||
      this.employee.telefono === undefined ||
      this.employee.genero === undefined
    ) {
      this.presentToast(`Fields must be filled in..`);
    } else {
      this.presentToast('Save user..');

      if (this.edit) this.dataService.updateEmployee(this.employee);
      else this.dataService.addEmployee(this.employee);

      this.router.navigateByUrl('/employees');
    }
  }

  /* Employee's Photo */

  async newImageUpload() {
    const path = 'UsersEmployees';
    this.image = await this.photoService.addPicture();
    const res = await this.photoService.uploadFile(this.image, path);
    this.employee.imagen = res;
  }

  /* Goback */
  goEmployees() {
    this.presentToast('Come back..');
    this.router.navigateByUrl('/employees');
    this.employee = {} as Employee;
  }

  /* Presents actions */
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
