import { Component, OnInit } from '@angular/core';
import {Color, Type} from '../../../datatypes/label';
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
  labelTypes = Object.values(Type) as Type[];
  selectedLabelType = this.labelTypes[0];

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  selectLabelType(labelType: Type){
    console.log(labelType);
    this.selectedLabelType = labelType
  }
  async dismissModal(cancelled = false) {
    console.log(this.selectedLabelType)
    if (cancelled) {
      await this.modalController.dismiss();
    }
    else {
      await this.modalController.dismiss({
        name: this.labelName,
        color: this.selectedColor.toString(),
        type: this.selectedLabelType.toString()
      });
    }
  }

}
