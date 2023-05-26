import { Component, OnInit } from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {AuthService} from '../services/auth.service';
import {ModalController} from '@ionic/angular';
import {InformationModalPageComponent} from '../shared/information-modal-page/information-modal-page.component';

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
              public modalController: ModalController
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
  async signUp() {
    let errorInfo: string[] = [];
    if(!this.email){
      errorInfo.push('Email is required')
    }
    if(!this.password){
      errorInfo.push('Password is required')
    }
    if(!this.firstName){
      errorInfo.push('Firstname is required')
    }
    if(!this.lastName){
      errorInfo.push('Lastname is required')
    }
    if(errorInfo.length===0){
      let fullName = this.firstName + ' ' + this.lastName;
      this.authService.signUp(this.email,this.password,fullName)
      this.clearFieldsAfterSubmit();
    }
    else{
     await this.presentInformationModal(errorInfo, 'validation errors')
    }

  }
  async presentInformationModal(information:string[], infoType:string){
    const modal=await this.modalController.create({
      component: InformationModalPageComponent,
      componentProps:{
        information:information,
        infoType: infoType
      },
    });
    modal.onDidDismiss().then();
    return await modal.present();
  }
  clearFieldsAfterSubmit(){
    this.firstName='';
    this.lastName='';
    this.password='';
    this.email='';
  }
}
