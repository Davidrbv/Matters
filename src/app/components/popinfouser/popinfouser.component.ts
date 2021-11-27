import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popinfouser',
  templateUrl: './popinfouser.component.html',
  styleUrls: ['./popinfouser.component.scss'],
})
export class PopinfouserComponent implements OnInit {

  opciones = ['accounting','dashboard','employees','invoices','sales'];

  constructor(private router: Router) { }

  ngOnInit() {}

  redirecTo(item){
    this.router.navigateByUrl('/' + item);
  }

}
