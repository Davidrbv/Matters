import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  email: string;
  password: string;

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
  googleAuthentication() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        this.userService.getUsers().subscribe(user => {
          if(user.length !== 1){
            this.userService.addUser({email: `${result.user.email}`, nombre: `${result.user.displayName}`,image: `${result.user.photoURL}`})
          }
        });          
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        this.presentToast('Ups. We have a problem with the authentication. Try again.');
      });
  }
}
