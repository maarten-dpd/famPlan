import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../datatypes/activity';
import {ActivityService} from '../../services/activity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmOrCancelModalPageComponent} from '../confirm-or-cancel-modal-page/confirm-or-cancel-modal-page.component';
import {ModalController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {FamilyMember} from '../../../datatypes/familyMember';
import {FamilyService} from '../../services/family.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})

export class ActivityItemComponent  implements OnInit {

  @Input() activity: Activity | undefined;

  #familyMemberSub!:Subscription
  familyMembers:FamilyMember[]=[]
  participants:FamilyMember[]=[]
  participantIds:string[]=[]

  constructor(public activityService: ActivityService,
              public activatedRoute: ActivatedRoute,
              public router:Router,
              public familyService: FamilyService,
              public modalController: ModalController) { }

  ngOnInit() {
    if(this.activity) {
      this.participantIds = this.activity.participants
    }
    this.#familyMemberSub = this.familyService.getFamilyMembersByFamilyId().subscribe(res=>{
      this.familyMembers=res;
      console.log(this.familyMembers)
      console.log(this.participantIds)
      this.participants = this.familyMembers.filter(p=>this.participantIds.includes(p.id))
      console.log(this.participants)
    })

  }
  ngOnDestroy(){
    if(this.#familyMemberSub){
      this.#familyMemberSub.unsubscribe()
    }
  }

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
