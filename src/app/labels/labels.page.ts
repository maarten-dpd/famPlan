import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LabelService} from '../services/label.service';
import {ModalController} from '@ionic/angular';
import {NewLabelModalComponent} from './new-label-modal/new-label-modal.component';
import {Subscription} from 'rxjs';
import {Label} from '../../datatypes/label';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.page.html',
  styleUrls: ['./labels.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LabelsPage implements OnInit {
  fabIsVisible = true;
  #labelSub! : Subscription;
  labels: Label[] = [];

  constructor(
    public labelService: LabelService,
    private modalController: ModalController,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.#labelSub = this.labelService.getAllLabels().subscribe( res =>{
      console.log(res);
      this.labels = res;
      this.cdr.detectChanges();
    })
console.log(this.labels);
  }
  ngOnDestroy(){
    if(this.#labelSub){
      this.#labelSub.unsubscribe();
    }
  }

  trackByLabelId(index: number, label: Label): string |undefined {
    if(label.id){
      return label.id;
    }else{
      return;
    }
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
    console.log(data)
    if (data.data === undefined) {
      return;
    }
    let name = data.data.name;
    console.log(name);
    let color = data.data.color;
    console.log(color);
    let type = data.data.type;
    console.log(type);
    this.labelService.createLabel(data.data.name, data.data.color, data.data.type);
  }


  checkDeleteLabel(id: string | undefined) {
    console.log(id);
    if(id){
      this.labelService.deleteLabel(id)
    }else{
      //show modal with error
    }
  }
}
