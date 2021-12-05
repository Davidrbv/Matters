import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  user: User = {
    id: undefined,
    email: '',
    nombre: '',
    password: undefined,
    password2: undefined,
  };

  constructor() {}

  ngOnInit() {}
}
