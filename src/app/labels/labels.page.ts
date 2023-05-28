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
  recipeLabels: Label[]=[];
  activityLabels: Label[]=[];

  constructor(
    public labelService: LabelService,
    private modalController: ModalController,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.#labelSub = this.labelService.getAllLabels().subscribe( res =>{
      this.labels = res;
      this.labels.sort();
      this.recipeLabels = this.labels.filter(l=>l.type === 'recipe');
      this.activityLabels = this.labels.filter(l=>l.type === 'activity')
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
    if (data.data === undefined) {
      return;
    }
    this.labelService.createLabel(data.data.name, data.data.color, data.data.type);
  }


  checkDeleteLabel(id: string | undefined) {
    if(id){
      this.labelService.deleteLabel(id)
    }else{
      //show modal with error
    }
  }
}
