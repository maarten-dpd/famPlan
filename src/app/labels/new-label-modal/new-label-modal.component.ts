import { Component, OnInit } from '@angular/core';
import {Color} from '../../../datatypes/label';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-new-label-modal',
  templateUrl: './new-label-modal.component.html',
  styleUrls: ['./new-label-modal.component.scss'],
})
export class NewLabelModalComponent implements OnInit {

  labelName: string = '';
  colors = Object.values(Color) as Color[];
  selectedColor = this.colors[0];

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismissModal(cancelled = false) {
    if (cancelled) {
      await this.modalController.dismiss();
    }
    else {
      await this.modalController.dismiss({
        name: this.labelName,
        color: this.selectedColor
      });
    }
  }

}
