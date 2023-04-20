import { Component, Input} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-string-input-modal-page',
  templateUrl: './string-input-modal-page.component.html',
  styleUrls: ['./string-input-modal-page.component.scss'],
})
export class StringInputModalPageComponent{
  @Input() requestedInput: string = '';
  myForm: FormGroup;

  constructor(private modalController: ModalController, private navParams: NavParams,
              private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      myString:['', Validators.required],
    });
  }

  async closeModal(){
    const data = {stringToAdd: this.myForm.value.myString};
    await this.modalController.dismiss(data);
  }
 /* async presentModal(){
    const modal = await this.modalController.create({
      component: StringInputModalPageComponent,
      cssClass: 'StringInputModalPageComponent-css',
    });
    return await modal.present();
  }*/


}
