import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent  implements OnInit {
  password: string = '';
  email: string = '';

  constructor(public authService:AuthService) { }

  ngOnInit() {}

  signIn() {
    this.authService.signIn(this.email,this.password);
  }
}
