import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../datatypes/activity';
import {ActivityService} from '../../services/activity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmOrCancelModalPageComponent} from '../confirm-or-cancel-modal-page/confirm-or-cancel-modal-page.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent  implements OnInit {

  @Input() activity: Activity | undefined;
  constructor(public activityService: ActivityService, public activatedRoute: ActivatedRoute,
  public router:Router,public modalController: ModalController) { }

  ngOnInit() {}

  async deleteActivity(id: string) {
    console.log('delete activity clicked')
    await this.presentConfirmOrCancelModal(id);

  }
  async presentConfirmOrCancelModal(id: string){
    console.log('present modal confirm or cancel')
    const modal = await this.modalController.create({
      component: ConfirmOrCancelModalPageComponent,
      componentProps:{
        question: 'this will delete the activity, are you sure?',
      }
    });
    modal.onDidDismiss().then((data) =>{
      if(data){
        console.log('answer: ');
        console.log(data)
        if(data.data.answer){
          this.activityService.deleteActivity(id);
        }
      }
    });
    return await modal.present();
  }
}
