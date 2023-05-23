import { Component, OnInit } from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {AuthService} from '../services/auth.service';
import {ModalController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isNative = Capacitor.isNativePlatform();
  email: string ='';
  password: string='';
  firstName: string = '';
  lastName: string = '';
  constructor(public authService: AuthService,  public navController:NavController) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signIn(this.email,this.password);
    this.clearFieldsAfterSubmit();
  }

  signUp() {
    let fullName = this.firstName + ' ' + this.lastName;
    this.authService.signUp(this.email,this.password,fullName)
    this.clearFieldsAfterSubmit();
  }
  clearFieldsAfterSubmit(){
    this.firstName='';
    this.lastName='';
    this.password='';
    this.email='';
  }
}
