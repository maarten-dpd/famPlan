import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../datatypes/activity';
import {ActivityService} from '../../services/activity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmOrCancelModalPageComponent} from '../confirm-or-cancel-modal-page/confirm-or-cancel-modal-page.component';
import {ModalController} from '@ionic/angular';
import {firstValueFrom} from 'rxjs';
import {FamilyMember} from '../../../datatypes/familyMember';
import {FamilyService} from '../../services/family.service';
import {Label} from '../../../datatypes/label';
import {LabelService} from '../../services/label.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})

export class ActivityItemComponent  implements OnInit {

  @Input() activity: Activity | undefined;

  familyMembers:FamilyMember[]=[];
  participants:FamilyMember[]=[];
  labels: Label[]=[];
  selectedLabels: Label[] = [];



  constructor(public activityService: ActivityService,
              public activatedRoute: ActivatedRoute,
              public router:Router,
              public familyService: FamilyService,
              public labelService: LabelService,
              public modalController: ModalController) { }

  async ngOnInit() {
    this.familyMembers = await firstValueFrom(this.familyService.getFamilyMembersByFamilyId())
    this.labels = await firstValueFrom(this.labelService.getLabelsByType('activity'))
    if (this.activity) {
      this.participants = this.familyMembers.filter(f=>(this.activity?.participants.includes(f.id)));
      this.selectedLabels = this.labels.filter(l=>(this.activity?.selectedLabels.includes(l.id)));
    }
  }
  ngOnDestroy(){
  }

  async deleteActivity(id: string) {
    await this.presentConfirmOrCancelModal(id);
  }
  async presentConfirmOrCancelModal(id: string){
    const modal = await this.modalController.create({
      component: ConfirmOrCancelModalPageComponent,
      componentProps:{
        question: 'this will delete the activity, are you sure?',
      }
    });
    modal.onDidDismiss().then((data) =>{
      if(data){
        if(data.data.answer){
          this.activityService.deleteActivity(id);
          this.router.navigate(['/home','activities-list',this.activity?.date]);
        }
      }
    });
    return await modal.present();
  }
}
