import { Component, OnInit } from '@angular/core';
import {FamilyService} from '../../../services/family.service';
import {LabelService} from '../../../services/label.service';
import {ActivityService} from '../../../services/activity.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Label} from '../../../../datatypes/label';
import {FamilyMember} from '../../../../datatypes/familyMember';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  familyName = this.familyService.getFamilyName();
  activityName: string = '';
  date: Date = new Date();
  id: string | null = '';
  description: string = '';
  activityLocation: string = '';
  participants = this.familyService.getFamilyMembers();
  selectedParticipants: boolean[] = Array(this.participants.length).fill(false);
  labels = this.labelService.getAllLabels();
  selectedLabels: boolean[] = Array(this.labels.length).fill(false);

  constructor(public familyService: FamilyService, public labelService: LabelService,
              public activityService: ActivityService, public activatedRoute : ActivatedRoute, public navController: NavController) { }

  ngOnInit() {
    this.setData();
  }

  handleCreateAndUpdate() {
    if (this.id) {
      this.updateActivity();
    } else {
      this.createActivity();
    }
    this.navController.back();
  }

  private setData() : void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if(this.id===null){
      return;
    }
    const activity = this.activityService.getActivity(this.id);
    if(activity){
      this.activityName = activity.name;
      this.activityLocation = activity.location;
      this.date = activity.date;
      this.description = activity.description;
      this.selectedLabels = this.labels.map(l => !!activity.labels.find(l2 => l2.id === l.id));
      this.selectedParticipants = this.participants.map(p => !!activity.participants.find(p2 => p2.id === p.id));
    }

  }

  private updateActivity() {
    this.activityService.updateActivity({
      id:this.id,
      activityName: this.activityName,
      date:this.date,
      location:this.activityLocation,

    })
  }

  private createActivity() {
    this.activityService.newActivity(this.activityName, this.getSelectedParticipants(), this.getSelectedLabels(), this.description, this.activityLocation, this.date)
  }

  private getSelectedParticipants():FamilyMember[] {
    return this.participants.filter((f, i) => this.selectedParticipants[i]);
  }

  private getSelectedLabels():Label[] {
    return this.labels.filter((l, i) => this.selectedLabels[i]);
  }
}
