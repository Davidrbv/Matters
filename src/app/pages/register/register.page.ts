import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  user: User = {} as User;

  constructor(private authService: AuthService,
              private router: Router,
              private toastController: ToastController,
              private userService : UserService) {}

  ngOnInit() {
  }

  async register() {
    if (
      this.user.email !== '' &&
      this.user.nombre !== '' &&
      this.user.password !== '' &&
      this.user.password.length >= 6 &&
      this.user.password === this.user.password2
    ) {
      if (await this.authService.registerUser(this.user.email, this.user.password)) {
        this.userService.addUser(this.user);
        this.router.navigateByUrl('/dashboard');
      } else {
        this.presentToast('Registered user..Try with other email..');
      }
    } else {
      this.presentToast('Fill the fields correctly...');
    }
  }

  async presentToast(message : string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'dark',
    });
    toast.present();
  }
}
