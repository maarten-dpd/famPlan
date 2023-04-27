import { Component, OnInit } from '@angular/core';
import {PhoneVerificationComponent} from './phone-verification/phone-verification.component';
import {Capacitor} from '@capacitor/core';
import {AuthService} from '../services/auth.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isNative = Capacitor.isNativePlatform();
  email: string ='';
  password: string='';
  constructor(public authService: AuthService, private modalController: ModalController) { }

  async showPhoneVerification(): Promise<void> {
    const modal = await this.modalController.create({
      component: PhoneVerificationComponent
    });
    return await modal.present();
  }

  ngOnInit() {
  }

  async signIn() {
    try {
      const userCredential = await this.authService.signInWithEmailAndPassword(this.email, this.password);
      console.log(`User with email ${userCredential.user.email} signed in`);
      this.navController.navigateRoot('/home');
    } catch (error) {
      console.error(error);
    }
  }
}
