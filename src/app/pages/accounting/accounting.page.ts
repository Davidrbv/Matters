import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.page.html',
  styleUrls: ['./accounting.page.scss'],
})
export class AccountingPage implements OnInit {
  delay: boolean = false;
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.delay = true;
    }, 3000);
  }
}
