import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/model/sale';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sales-register',
  templateUrl: './sales-register.page.html',
  styleUrls: ['./sales-register.page.scss'],
})
export class SalesRegisterPage implements OnInit {
  

  sale : Sale = {
    
    id: undefined,
    fecha: new Date(),
    efectivo: undefined,
    tarjeta: undefined,
    total: undefined
  }
  constructor(private saleService: SaleService,
      private router: Router,
      private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id != null){
    //Metemos un + en el id para convertirlo en Int, ya que nos llega como string
      this.saleService.getSale(+id).subscribe(
      data => {this.sale = data;
        console.log(data);}
      );
    }
  }

  saveSale(){
    console.log(this.sale);
    this.saleService.saveSale(this.sale);
    this.router.navigateByUrl('/sales');
  }

  goSales(){
    this.router.navigateByUrl('/sales');
  }
}

