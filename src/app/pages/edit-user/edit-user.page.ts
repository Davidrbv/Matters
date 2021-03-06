import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/model/user";
import { UserService } from "src/app/services/user.service";
import { AlertController, ToastController } from "@ionic/angular";
import { PhotoService } from "src/app/services/photo.service";
import { updateEmail, updatePassword } from "firebase/auth";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.page.html",
  styleUrls: ["./edit-user.page.scss"]
})
export class EditUserPage implements OnInit {
  user: User = {} as User;
  image: any;
  pass: string = "";
  passRepeat: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private photoService: PhotoService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const stopService = this.userService.getUsers().subscribe(data => {
      this.user = data[0];
      stopService.unsubscribe()
    });
  }

  /* User's image change */
  async newImageUpload() {
    const path = "UsersPhoto";
    this.image = await this.photoService.addPicture();
    const res = await this.photoService.uploadFile(this.image, path);
    this.user.image = res;
  }

  /* User's data changes */
  saveChange(user: User) {
    if (this.pass !== this.passRepeat) {
      this.presentToast("Passwords should be the same..");
    } else {
      updateEmail(this.authService.getCurrentUser(), user.email)
        .then(() => {
          updatePassword(this.authService.getCurrentUser(), this.pass)
            .then(() => {
              //user.admin =true
              this.userService.updateUser(user);
              if(user.delete === true){
                this.presentToast("Why??..");
                this.router.navigateByUrl("/home");
                this.authService.logOut();
              }else {
                this.presentToast("Making changes...");
                this.router.navigateByUrl(`/dashboard`);
              }
            })
            .catch(() => {
              this.presentToast("Password change error. Try again.");
            });
        })
        .catch(() => {
          this.presentToast("Email change error. Try again.");
        });
    }
  }

  /* Cancel Change */
  cancelChange() {
    this.presentToast("Changes cancelled..");
    this.router.navigateByUrl(`/dashboard`);
  }

  /* Delete User confirm*/
  async presentAlertConfirm(user : User) {
    const alert = await this.alertController.create({
      header: `Email: ${this.user.email}`,
      subHeader: `??Why ${this.user.nombre}?`,
      message: `Your account will be deleted. ??Are you sure?`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.presentToast("Cancel Action..fiiiiuuu..");
          }
        },
        {
          text: "Ok",
          handler: () => {
            this.saveChange(user);
          }
        }
      ]
    });

    await alert.present();
  }

  /* Messages Alert */
  async presentToast(message?: string) {
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
