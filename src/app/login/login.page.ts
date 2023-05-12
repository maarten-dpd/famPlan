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
  constructor(public authService: AuthService,  public navController:NavController) { }

  // private modalController: ModalController,
  ngOnInit() {
  }

  signIn() {
    this.authService.signIn(this.email,this.password);
  }
}
