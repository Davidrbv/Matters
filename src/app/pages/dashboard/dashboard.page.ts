import { Component, OnInit } from "@angular/core";
import { Module } from "src/app/interfaces/module";
import { Router } from "@angular/router";
import { User } from "src/app/model/user";
import { UserService } from "src/app/services/user.service";
import { Invoice } from "src/app/model/invoice";
import { InvoiceService } from "src/app/services/invoice.service";
import { ToastController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  modulos: Module[];
  user: User = {} as User;
  invoices: Invoice[];
  pending: number;
  date: String;

  constructor(
    private userService: UserService,
    private router: Router,
    private invoiceService: InvoiceService,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userService.getDateFromStorage().then(data => {
      if (data !== null) this.date = data;
      else this.date = "Welcome human!!";
      this.presentToast(this.date.toString());
    });

    const stopService = this.userService.getUsers().subscribe(data => {
      if(data[0].delete === true){
        this.authService.logOut();
        this.router.navigateByUrl('/home');
      }else{
        this.user = data[0];
      }
      stopService.unsubscribe()
    });
    this.userService.saveDateIntoStorage();
    this.getmodules();
    this.invoiceService.getInvoices().subscribe(data => {
      this.pending = data.length;
    });
  }

  /* Recuperamos modulos de usuarios */
  getmodules() {
    this.userService.getModules().subscribe(data => {
      this.modulos = data;
    });
  }

  /* Redirección a edición de usuario */
  goToEditeUser() {
    this.router.navigateByUrl(`/edit-user`);
  }

  /* Redirección a modulo */
  goTo(module: Module) {
    this.router.navigateByUrl(`/${module.redirecTo}`);
  }

  /* Show actions */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: "bottom",
      animated: true,
      color: "dark  "
    });
    toast.present();
  }
}
