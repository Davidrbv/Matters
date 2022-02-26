import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

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
              private alertController: AlertController,
              private toastController: ToastController) {}

  async login() {
    const connectionSuccess = await this.authService.login(this.email, this.password);
    if (connectionSuccess) this.router.navigateByUrl('/dashboard');
    else this.presentAlert();
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: `User Not Found`,
      message: 'Enter a correct email and password.',
      buttons: ['OK'],
      animated: true,
    });

    await alert.present();
  }

  /* Presentacion de acciones realizadas */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'dark  ',
    });
    toast.present();
  }

  googleAuthentication() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const userEmail = result.user.email;
        this.authService.recoveryPass(userEmail);
        this.presentToast('Email send to change password..');
        
      })
      .catch((error) => {
        this.presentToast('Authenticacion with Google error..');
      });
  }

  facebookAuthentication() {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const userEmail = result.user.email;
        this.authService.recoveryPass(userEmail);
        this.presentToast('Email send to change password..');
      })
      .catch((error) => {
        this.presentToast('Authenticacion with Facebook error..');
        // Handle Errors here.
        const errorCode = error.code;

        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;        
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(errorMessage);
        
      });
  }
}
