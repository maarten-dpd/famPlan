import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {
  email: string = '';
  password: string = '';

  constructor(public authService: AuthService) { }

  ngOnInit() {}

  signUp() {
    this.authService.signUp(this.email,this.password)
  }
}