import { Component, OnInit } from '@angular/core';
import {FamilyService} from '../../../services/family.service';
import {LabelService} from '../../../services/label.service';
import {ActivityService} from '../../../services/activity.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Label} from '../../../../datatypes/label';
import {FamilyMember} from '../../../../datatypes/familyMember';
import {Activity} from '../../../../datatypes/activity';

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
  participants: FamilyMember[]=[];
  selectedParticipants: FamilyMember[] = [];
  labels = this.labelService.getLabelsByType('activity');
  selectedLabels: Label[] =[];
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
    const activity = this.activityService.getActivityById(this.id);
    console.log(activity);
    this.dateToParse = new Date(activity.date).toISOString();
    // this.activityName = activity.name;
    // this.location = activity.location;
    // this.date = this.dateToParse;
    // this.description = activity.description;
    // this.selectedLabels = activity.labels;
    // this.selectedParticipants = activity.participants;
  }
  private updateActivity() {
    let convertedDate = new Date(this.dateToParse).toString()
    if(this.id){
      const activityToUpdate : Activity ={
        id:this.id,
        name: this.activityName,
        date:convertedDate,
        location:this.location,
        description:this.description,
        participants:this.selectedParticipants,
        labels: this.selectedLabels
      }
      this.activityService.updateActivity(this.id,activityToUpdate);
    }
    else{
      console.log('activity has no id field and can not be deleted')
      //replace by modal to give user warning
    }
  }
  private createActivity() {
    this.date = new Date(this.dateToParse).toString();
    this.activityService.newActivity(this.activityName, this.selectedParticipants,
      this.selectedLabels, this.description, this.location, this.date)
  }
  checkDeleteLabel(id: string | undefined) {
    if(id){
      this.labelService.deleteLabel(id)
    }else{
      //show modal with error
    }
  }
  isSelectedParticipant(participant: FamilyMember) {
    return this.selectedParticipants.some(p=>p.id === participant.id);
  }
  changeParticipantSelection(participant: FamilyMember) {
    if(this.isSelectedParticipant(participant)){
      const index = this.selectedParticipants.findIndex(p=>p.id === participant.id);
      if (index !== -1){
        this.selectedParticipants.splice(index, 1);
      }
    } else {
      this.selectedParticipants.push(participant);
    }
  }
  isSelectedLabel(label: Label) {
    return this.selectedLabels.some(l=>l.id === label.id);
  }
  changeLabelSelection(label: Label) {
    if(this.isSelectedLabel(label)){
      const index = this.selectedLabels.findIndex(l=>l.id === label.id);
      if (index !== -1){
        this.selectedLabels.splice(index, 1);
      }
    } else {
      this.selectedLabels.push(label);
    }
  }
    protected readonly Number = Number;
}
