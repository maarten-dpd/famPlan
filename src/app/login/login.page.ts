import { Component, OnInit } from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {AuthService} from '../services/auth.service';
import {ModalController} from '@ionic/angular';
import {InformationModalPageComponent} from '../shared/information-modal-page/information-modal-page.component';
import {StringInputModalPageComponent} from '../shared/string-input-modal-page/string-input-modal-page.component';
import {Family} from '../../datatypes/family';
import {FamilyService} from '../services/family.service';
import {Subscription} from 'rxjs';

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
  familyId?:string;
  family?:Family;
  #familySub!:Subscription;
  families:Family[]=[]

  constructor(public authService: AuthService,
              public modalController: ModalController,
              public familyService:FamilyService
) { }

  ngOnInit() {
    this.#familySub = this.familyService.getAllFamilies().subscribe(res=>{
      this.families = res;
    })
  }
  ngOnDestroy(){
    if(this.#familySub){
      this.#familySub.unsubscribe();
    }
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
    if(!this.familyId){
      errorInfo.push('a family must be created or selected')
    }
    if(errorInfo.length===0){
      if(this.familyId){
        console.log('ready to create user and familyMember')
        this.authService.signUp(this.email,this.password,this.firstName,this.lastName, this.familyId)
        this.clearFieldsAfterSubmit();
      }
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
  async presentInputModal(requestedInput: string, type: string){
    const modal=await this.modalController.create({
      component: StringInputModalPageComponent,
      componentProps:{
        requestedInput: requestedInput,
      },
    });
    await modal.present();
    modal.onDidDismiss().then(async (data) => {
      if (data.role === 'cancel') {
        return;
      }
      if (data && data.data && data.data.stringToAdd) {
        if (type === 'Create') {
          await this.familyService.createFamilyAndReturnNewFamilyId(data.data.stringToAdd).then((res) => {
            this.familyId = res;
            console.log('familyId was set to ')
            console.log(this.familyId);
          })
        }
      }
    });

  }
  clearFieldsAfterSubmit(){
    this.firstName='';
    this.lastName='';
    this.password='';
    this.email='';
  }

  async familySelected() {
      if(this.familyId === 'createNewFamily'){
        await this.presentInputModal('FamilyName','Create')
      }
  }
}
