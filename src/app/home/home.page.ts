import { Component, ContentChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
//Todo: Ver popInfoUser
import { PopinfouserComponent } from '../components/popinfouser/popinfouser.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  password: string;

  constructor(private router: Router,
              private authService: AuthService,
              private alertController: AlertController) {}

  async login() {
    const connectionSuccess = await this.authService.login(this.email, this.password);
    if (connectionSuccess) this.router.navigateByUrl('/dashboard');
    else this.presentAlert();
  }

  goToRegister(){
    this.router.navigateByUrl('/register');    
  }
  

  //TODO: MODIFICAR ASPECTO PRESENTALERT!!!!!!!
  async presentAlert() {
    const alert = await this.alertController.create({
      header: `User Not Found`,
      message: 'Enter a correct email and password.',
      buttons: ['OK'],
      animated: true,
    });

    await alert.present();
  }
}
