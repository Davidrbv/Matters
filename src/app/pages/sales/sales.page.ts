import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { Sale } from "src/app/model/sale";
import { SaleService } from "src/app/services/sale.service";
import {
  ActionSheetController,
  AlertController,
  ToastController
} from "@ionic/angular";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.page.html",
  styleUrls: ["./sales.page.scss"]
})
export class SalesPage implements OnInit {
  sales: Observable<Sale[]>;
  salesFilter: Sale[];
  min: number = 0;
  max: number = 0;
  searchSaleType: string = "";
  dateFrom: Date = null;
  dateTo: Date = null;
  dateWithPipe = null;

  constructor(
    public saleService: SaleService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.searchSaleType = "";
    this.sales = this.saleService.getSales();
  }

  goToSaleRegister(id?: string) {
    this.router.navigateByUrl(
      `/sales-register${id !== undefined ? "/" + id : ""}`
    );
  }

  /* Get all Sales */
  getAll() {
    this.reset();
    this.sales = this.saleService.getSales();
  }

  /* Sales's range quantity filter */
  getSalesRange() {
    if (
      (this.min === 0 && this.max === 0) ||
      (this.min === null || this.max === null)
    )
      this.sales = this.saleService.getSales();
    else {
      this.saleService.getSales().subscribe(data => {
        this.sales = of(
          data.filter(sale => sale.total >= this.min && sale.total <= this.max)
        );
      });
    }
  }

  /* Sales's range date filter */
  searchDate() {
    if (this.dateFrom != null && this.dateTo != null) {
      if (this.dateFrom > this.dateTo) {
        this.presentToast("First date bigger than second date!!");
      } else {
        this.saleService.getSales().subscribe(data => {
          this.sales = of(
            data.filter(
              sale => sale.fecha >= this.dateFrom && sale.fecha <= this.dateTo
            )
          );
        });
      }
    }
  }

  /* Reset range when search type change */
  reset() {
    this.min = 0;
    this.max = 0;
    this.dateFrom = null;
    this.dateTo = null;
  }

  /* Show window's message */
  async presentActionSheet(sale: Sale) {
    const pipe = new DatePipe("en-US");
    this.dateWithPipe = pipe.transform(sale.fecha, "dd/MM/yyyy");
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Date invoice: ${this.dateWithPipe}`,
      mode: "ios",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          icon: "trash",
          cssClass: "rojo",
          handler: () => {
            this.presentAlertConfirm(sale);
          }
        },
        {
          text: "Edit",
          icon: "pencil",
          handler: () => {
            this.goToSaleRegister(sale.saleId);
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            this.presentToast("Cancel action...");
          }
        }
      ]
    });

    await actionSheet.present();
  }

  /* Delete sale confirm */
  async presentAlertConfirm(venta: Sale) {
    const alert = await this.alertController.create({
      header: `Date: ${venta.fecha}`,
      subHeader: `Id: ${venta.saleId}`,
      message: `This sale will be deleted. Are you sure?`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.presentToast("Action canceled..");
          }
        },
        {
          text: "Ok",
          handler: () => {
            this.presentToast("Deleting sale..");
            this.saleService.deleteSale(venta.saleId);
            this.router.navigateByUrl("/sales");
          }
        }
      ]
    });

    await alert.present();
  }

  /* Show actions */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 600,
      position: "bottom",
      animated: true,
      color: "dark  "
    });
    toast.present();
  }
}
