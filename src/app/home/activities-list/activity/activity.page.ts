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
  activityName: string = '';
  date: string =(new Date().toString());
  dateToParse:string = new Date(this.date).toISOString();
  id: string | null = '';
  description: string = '';
  location: string = '';
  participants = this.familyService.getFamilyMembers();
  selectedParticipants: boolean[] = Array(this.participants.length).fill(false);
  labels = this.labelService.getLabelsByType('activity');
  selectedLabels: boolean[] = Array(this.labels.length).fill(false);
  yearValues: number[] = []

  constructor(public familyService: FamilyService, public labelService: LabelService,
              public activityService: ActivityService, public activatedRoute : ActivatedRoute,
              public navController: NavController) {
    const currentYear:number = (new Date().getFullYear());
    for (let year = currentYear; year<(currentYear + 100); year++){
      this.yearValues.push(year);
    }
  }

  ngOnInit() {
    this.setData();
  }

  handleCreateAndUpdate() {
    console.log('entered handle create and update')
    if (this.id) {
      console.log('choose to update')
      this.updateActivity();
    } else {
      console.log('choose to create')
      this.createActivity();
    }
    this.navController.back();
  }

  private setData() : void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if(this.id===null){
      return;
    }
    console.log(this.id);
    const activity = this.activityService.getActivity(this.id);
    console.log(activity)
    if(activity){
      this.dateToParse = new Date(activity.date).toISOString();
      this.activityName = activity.name;
      this.location = activity.location;
      this.date = this.dateToParse;
      this.description = activity.description;
      this.selectedLabels = this.labels.map(l => !!activity.labels.find(l2 => l2.id === l.id));
      this.selectedParticipants = this.participants.map
      (p => !!activity.participants.find(p2 => p2.id === p.id));
    }

  }

  private updateActivity() {
    console.log('updating with following data: ' + this.id + 'name: ' + this.activityName + 'date: ' + this.dateToParse + 'location: ' + this.location)
    console.log('participants: ' + this.getSelectedParticipants() + 'labels: ' + this.getSelectedLabels())
    let convertedDate = new Date(this.dateToParse).toString()
    this.activityService.updateActivity({
      id:this.id,
      name: this.activityName,
      date:convertedDate,
      location:this.location,
      description:this.description,
      participants:this.getSelectedParticipants(),
      labels: this.getSelectedLabels()

    })
  }

  private createActivity() {
    this.date = new Date(this.dateToParse).toString(),
    console.log ('date: ');
    console.log(this.date);
    console.log('date To parse: ');
    console.log(this.dateToParse)
    this.activityService.newActivity(this.activityName, this.getSelectedParticipants(),
      this.getSelectedLabels(), this.description, this.location, this.date)
  }

  private getSelectedParticipants():FamilyMember[] {
    return this.participants.filter((f, i) => this.selectedParticipants[i]);
  }

  private getSelectedLabels():Label[] {
    return this.labels.filter((l, i) => this.selectedLabels[i]);
  }
}
