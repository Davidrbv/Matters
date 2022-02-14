import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recovery-pass',
  templateUrl: './recovery-pass.page.html',
  styleUrls: ['./recovery-pass.page.scss'],
})
export class RecoveryPassPage implements OnInit {

  email : string = "";

  constructor(private authService : AuthService,
              private router : Router,
              private alertController : AlertController) { }

  ngOnInit() {
  }

  resetPassword(){
    if(this.email !== ""){
      this.authService.recoveryPass(this.email)
      .then(
        () => {
          this.presentAlert('An email has been sent to you with the following information.');
          this.router.navigateByUrl('/home');
        }
      )
      .catch(
        () => this.presentAlert('Unregistered email address.')
      );
    }else this.presentAlert('Fields must be filled in.')
  }

  async presentAlert(message : string) {
    const alert = await this.alertController.create({
      header: 'Recovery Password.',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
