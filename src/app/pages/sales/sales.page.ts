import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sale } from 'src/app/model/sale';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  sales : Sale [] = [];

  constructor(public saleService: SaleService,
              private router: Router) { }


  ngOnInit() {
    this.getSales();
  }

  getSales(){
    return this.saleService.getSalesFromStorage().then(data => {
      this.sales = data;
    });
  }

  goToSaleRegister(id? : number){
    this.router.navigateByUrl(`/sales-register${id !== undefined ? '/' + id : ''}`);
  }

}