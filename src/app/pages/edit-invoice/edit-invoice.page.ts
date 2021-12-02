import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/model/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.page.html',
  styleUrls: ['./edit-invoice.page.scss'],
})
export class EditInvoicePage implements OnInit {

  factura : Invoice = {

    id: undefined,
    codigo: '',
    fecha: new Date(),
    cantidad: undefined,
    proveedor: '',
    estado: false

  };

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private invoiceService: InvoiceService) { }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null){
      //Metemos un + en el id para convertirlo en Int, ya que nos llega como string
      this.invoiceService.getInvoice(+id).subscribe(
        data => {this.factura = data;
          console.log(data);}
      );
    }
  }

  saveInvoice(){
    console.log(this.factura);
    this.invoiceService.saveInvoice(this.factura).then(() => this.router.navigateByUrl('/invoices'));
  }

  goInvoices(){
    this.router.navigateByUrl('/invoices');
  }

}
