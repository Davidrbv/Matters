import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable, of } from "rxjs";
import { Invoice } from "src/app/model/invoice";
import { InvoiceService } from "src/app/services/invoice.service";
import SwiperCore, { Pagination, EffectCoverflow } from "swiper";

SwiperCore.use([Pagination, EffectCoverflow]);
@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.page.html",
  styleUrls: ["./invoices.page.scss"]
})
export class InvoicesPage implements OnInit {
  invoices: Observable<Invoice[]>;
  estado: boolean = null;
  dateFrom: Date = null;
  dateTo: Date = null;
  searchSaleType: string;
  min: number = 0;
  max: number = 0;

  constructor(
    public invoiceService: InvoiceService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.searchSaleType = "";
    this.estado = false;
    this.allInvoices();
  }

  /* All invoices */
  allInvoices() {
    this.reset();
    this.invoices = this.invoiceService.getInvoices();
  }

  /* Invoices order by state */
  invoiceStatus(estado: boolean) {
    this.invoiceService.getInvoices().subscribe(data => {
      this.invoices = of(data.filter(invoice => invoice.estado === estado));
    });
    this.estado = !this.estado;
  }

  /* Invoices's range quantity filter */
  getSalesRange() {
    if (
      (this.min === 0 && this.max === 0) ||
      (this.min === null || this.max === null)
    )
      this.invoices = this.invoiceService.getInvoices();
    else {
      this.invoiceService.getInvoices().subscribe(data => {
        this.invoices = of(
          data.filter(
            invoice =>
              invoice.cantidad >= this.min && invoice.cantidad <= this.max
          )
        );
      });
    }
  }

  /* Search invoice by date */
  searchDate() {
    if (this.dateFrom != null && this.dateTo != null) {
      if (this.dateFrom > this.dateTo) {
        this.presentToast("First date bigger than second date!!");
      } else {
        this.invoiceService.getInvoices().subscribe(data => {
          this.invoices = of(
            data.filter(
              invoice =>
                invoice.fecha >= this.dateFrom && invoice.fecha <= this.dateTo
            )
          );
        });
      }
    }
  }

  /* Reset range when search type change */
  reset() {
    this.dateFrom = null;
    this.dateTo = null;
    this.min = 0;
    this.max = 0;
  }

  /* Redirect to edit-invoice */
  goToEditInvoice(id?: string) {
    this.router.navigateByUrl(
      `/edit-invoice${id !== undefined ? "/" + id : ""}`
    );
  }

  /* Delete invoice */
  deleteInvoice(id: string) {
    this.invoiceService.deleteInvoice(id);
  }

  /* Invoice confirm delete */

  async presentAlertConfirm(invoice: Invoice) {
    const alert = await this.alertController.create({
      header: `Invoice code:  ${invoice.codigo}`,
      message: `The invoice will be deleted. ¿Are you sure?`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.presentToast("Action cancelled..");
          }
        },
        {
          text: "Ok",
          handler: () => {
            this.invoiceService.deleteInvoice(invoice.invoiceId);
            this.presentToast("Delete invoice..");
            this.router.navigateByUrl("/invoices");
          }
        }
      ]
    });

    await alert.present();
  }

  /* Information messsages */
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
