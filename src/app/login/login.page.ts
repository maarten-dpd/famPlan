import { Component, OnInit } from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {AuthService} from '../services/auth.service';
import {NavController} from '@ionic/angular';
import {FamilyService} from '../services/family.service';

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
  constructor(public authService: AuthService,
              public navController:NavController,
              public familyService: FamilyService,
) { }

  ngOnInit() {
  }

  signIn(type:number) {
    if(type===1){
      this.authService.signInWithGoogle();
    }
    if(type===2)
    {
      this.authService.signIn(this.email,this.password);
    }
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
