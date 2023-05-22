import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-information-modal-page',
  templateUrl: './information-modal-page.component.html',
  styleUrls: ['./information-modal-page.component.scss'],
})
export class InformationModalPageComponent {
  @Input() information: string[] = [];
  @Input() infoType: string = '';
  @Output() answerEmitter = new EventEmitter<boolean>();
  constructor(private modalController: ModalController) {}

  async confirm(){
    await this.closeModal()
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
