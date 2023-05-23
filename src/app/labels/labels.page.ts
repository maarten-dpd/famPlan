import { Component, OnInit } from '@angular/core';
import {LabelService} from '../services/label.service';
import {ModalController} from '@ionic/angular';
import {NewLabelModalComponent} from './new-label-modal/new-label-modal.component';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.page.html',
  styleUrls: ['./labels.page.scss'],
})
export class LabelsPage implements OnInit {
  fabIsVisible = true;
  labels = this.labelService.getAllLabels();
  labelList = this.labels.toPromise()

  constructor(public labelService: LabelService, private modalController: ModalController) {
    console.log('start lezen labels');
    this.labelList
      .then((values) => {
        console.log(values); // Process the resolved values
      })
      .catch((error) => {
        console.error(error); // Handle any errors that occurred
      });
    console.log('lezen labels klaar')
  }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewLabelModalComponent,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then(d => this.handleModalDismiss(d));
    return await modal.present();

  }

  logScrollStart(): void {
    this.fabIsVisible = false;
  }

  logScrollEnd(): void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }

  private handleModalDismiss(data: any) {

    if (data.data === undefined) {
      return;
    }

    this.labelService.createLabel(data.data.name, data.data.color, data.data.type);
  }


}
