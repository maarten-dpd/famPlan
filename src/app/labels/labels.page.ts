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
//attributes
  fabIsVisible = true;
  #labelSub! : Subscription;
  labels: Label[] = [];
  recipeLabels: Label[]=[];
  activityLabels: Label[]=[];

//constructor
  constructor(
    public labelService: LabelService,
    private modalController: ModalController,
    private cdr: ChangeDetectorRef) {
  }

//onInit/Destroy
  ngOnInit() {
    this.#labelSub = this.labelService.getAllLabels().subscribe( res =>{
      this.labels = res;
      this.labels.sort();
      this.recipeLabels = this.labels.filter(l=>l.type === 'recipe');
      this.recipeLabels.sort((a,b) => a.name.localeCompare(b.name));
      this.activityLabels = this.labels.filter(l=>l.type === 'activity');
      this.activityLabels.sort((a,b) => a.name.localeCompare(b.name));
      this.cdr.detectChanges();
    })
  }
  ngOnDestroy(){
    if(this.#labelSub){
      this.#labelSub.unsubscribe();
    }
  }

//method to track changes in the labels - used to refresh the label list after adding label
  trackByLabelId(index: number, label: Label): string |undefined {
    if(label.id){
      return label.id;
    }else{
      return;
    }
  }

//present modal to create label
  async presentModal() {
    const modal = await this.modalController.create({
      component: NewLabelModalComponent,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then(d => this.handleModalDismiss(d));
    return await modal.present();
  }
  private handleModalDismiss(data: any) {
    if (data.data === undefined) {
      return;
    }
    this.labelService.createLabel(data.data.name, data.data.color, data.data.type);
  }

//handle fab button
  logScrollStart(): void {
    this.fabIsVisible = false;
  }
  logScrollEnd(): void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }

//check on deleting label if label is in use
  checkDeleteLabel(id: string | undefined) {
    if(id){
      this.labelService.deleteLabel(id).then((res)=>{
        if(res) console.log('label is deleted');
        if(!res) console.log('label is in use and can not be deleted');
      })
    }else{
      console.log('label has no Id and can not be deleted');
    }
  }
}
