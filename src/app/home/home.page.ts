import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  email: string;
  password: string;
  user: User;

  constructor(private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController,
    private userService: UserService) { }

  ngOnInit(): void {
    if (getAuth().currentUser !== null) {
      this.router.navigateByUrl('/dashboard');
    }
  }


  /* User Login */
  async login() {

    if (this.email !== "" && this.password !== "") {
      const connectionSuccess = await this.authService.login(this.email, this.password);
      if (connectionSuccess) this.router.navigateByUrl('/dashboard');
      else this.presentAlert();
    }
  }

  /* Redirect user's register */
  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  /* Redirect user's recovery account pass */
  goToRecovery() {
    this.router.navigateByUrl('/recovery-pass');
  }

  /* Show user not found */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: `User Not Found`,
      message: 'Enter a correct email and password.',
      buttons: ['OK'],
      animated: true,
    });

    await alert.present();
  }

  /* Show actions */
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

  /* Google Authentication */
  // TODO: Esta historia no esta bien montada. Ver si ya existe el usuario.
  //Si existe el usuario entra normal, si no, hay que registrarlo con datos por defecto.
  googleAuthentication() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const userEmail = result.user.email;
        this.authService.recoveryPass(userEmail);
        this.userService.addUser({email: `${result.user.email}`, nombre: `${result.user.displayName}`, password: '111111', password2: '111111', image: `${result.user.photoURL}`})
        this.router.navigateByUrl('/dashboard');
        this.presentToast('Email send to change password..');
      })
      .catch((error) => {
        this.presentToast('Authenticacion with Google error..');
      });
  }

  /* FaceBook Authentication unused */
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
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(errorMessage);

      });
  }
}
