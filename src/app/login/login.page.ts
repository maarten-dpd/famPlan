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
//attributes
  isNative = Capacitor.isNativePlatform();
  email: string ='';
  password: string='';
  firstName: string = '';
  lastName: string = '';
  familyId?:string;
  family?:Family;
  #familySub!:Subscription;
  families:Family[]=[]

//constructor
  constructor(public authService: AuthService,
              public modalController: ModalController,
              public familyService:FamilyService
) { }

//onInit/destroy
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

//methods for handling user action
  signIn(type:number) {
    //check if signIn is clicked on google button or email and password
    if(type===1){
      this.authService.signInWithGoogle().then(()=>{
        console.log('user authenticated')
      });
    }
    if(type===2)
    {
      this.authService.signIn(this.email,this.password);
    }
    this.clearFieldsAfterSubmit();
  }
  async signUp() {
    let errorInfo: string[] = [];
    //validation of data - the primitive way
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
    //if valid - continue sign up
    if(errorInfo.length===0){
      //check if family is selected
      if(this.familyId){
        //if family is selected - sign up
        this.authService.signUp(this.email,this.password,this.firstName,this.lastName, this.familyId)
        this.clearFieldsAfterSubmit();
      }
    }
    else{
      //show validation errors
     await this.presentValidationErrors(errorInfo, 'validation errors')
    }
  }

//modals to inform user
  async presentValidationErrors(information:string[], infoType:string){
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
  async presentCreateFamilyModal(requestedInput: string, type: string){
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

//method to clear fields after submission of form
  clearFieldsAfterSubmit(){
    this.firstName='';
    this.lastName='';
    this.password='';
    this.email='';
  }

//method to allow user to create new family before sign up
  async familySelected() {
      if(this.familyId === 'createNewFamily'){
        await this.presentCreateFamilyModal('FamilyName','Create')
      }
  }

}
