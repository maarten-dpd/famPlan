import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-or-cancel-modal-page',
  templateUrl: './confirm-or-cancel-modal-page.component.html',
  styleUrls: ['./confirm-or-cancel-modal-page.component.scss'],
})
export class ConfirmOrCancelModalPageComponent {
  @Input() question: string = '';
  @Output() answerEmitter = new EventEmitter<boolean>();
  answer : boolean = false;
  constructor(private modalController: ModalController) {}

  async confirm(){
    this.answer = true;
    await this.closeModal()
  }
  async cancel(){
    this.answer = false;
    await this.closeModal()
  }
  async closeModal(){
    const data = {answer: this.answer};
    await this.modalController.dismiss(data);
  }

}
