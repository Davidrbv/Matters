import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { User } from "src/app/model/user";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  user: User = {} as User;
  pass: string = "";
  passRepeat: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private userService: UserService
  ) {}

  ngOnInit() {}

  async register() {
    if (
      this.user.email !== "" &&
      this.user.nombre !== "" &&
      this.pass !== "" &&
      this.pass === this.passRepeat
    ) {
      if (
        (await this.authService.registerUser(this.user.email, this.pass)) &&
        this.pass.length >= 6
      ) {
        this.userService.addUser(this.user);
        this.router.navigateByUrl("/dashboard");
      } else {
        this.presentToast("Registered user..Try with other email..");
      }
    } else {
      this.presentToast("Fill the fields correctly...");
    }
  }

  goToHome() {
    this.router.navigateByUrl("/home");
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: "bottom",
      animated: true,
      color: "dark"
    });
    toast.present();
  }
}
