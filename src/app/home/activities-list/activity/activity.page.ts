import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FamilyService} from '../../../services/family.service';
import {LabelService} from '../../../services/label.service';
import {ActivityService} from '../../../services/activity.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Label} from '../../../../datatypes/label';
import {FamilyMember} from '../../../../datatypes/familyMember';
import {Activity} from '../../../../datatypes/activity';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
//attributes
  activityName: string = '';
  date: string =(new Date().toString());
  dateToParse:string = new Date(this.date).toISOString();
  id: string | null = '';
  description: string = '';
  location: string = '';
  #familyMemberSub!:Subscription;
  familyMembers: FamilyMember[]=[];
  participants: FamilyMember[]=[];
  selectedParticipants: string[] = [];
  #labelSub!:Subscription;
  labels: Label[]=[];
  selectedLabels: string[] =[];
  yearValues: number[] = []
  protected readonly Number = Number;

//constructor
  constructor(public familyService: FamilyService,
              public labelService: LabelService,
              public activityService: ActivityService,
              public activatedRoute : ActivatedRoute,
              public navController: NavController,
              private cdr:ChangeDetectorRef) {
    //this code is needed to create the calendar to pick a date
    const currentYear:number = (new Date().getFullYear());
    for (let year = currentYear; year<(currentYear + 100); year++){
      this.yearValues.push(year);
    }
  }

//On Init/Destroy/set Data
  ngOnInit() {
    this.setData();
  }
  ngOnDestroy(){
    if(this.#familyMemberSub){
      this.#familyMemberSub.unsubscribe();
    }
    if(this.#labelSub){
      this.#labelSub.unsubscribe();
    }
  }
  private setData() : void {
    //create observable for family members
    this.#familyMemberSub = this.familyService.getFamilyMembersByFamilyId().subscribe((res)=>{
      this.familyMembers = res;
      this.familyMembers.sort((a,b) => a.firstName.localeCompare(b.firstName));
      this.cdr.detectChanges();
    })
    //create observable for labels
    this.#labelSub = this.labelService.getLabelsByType('activity').subscribe(res=>{
      this.labels = res;
      this.labels.sort((a,b) => a.name.localeCompare(b.name));
      this.cdr.detectChanges();
    })
    //check if page is needed for update or create
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if(this.id===null){
      return;
    }
    //if not create - load activity the activity observable is in the activity service
    const activity = this.activityService.getActivityById(this.id);
    this.dateToParse = new Date(activity.date).toISOString();
    this.activityName = activity.name;
    this.location = activity.location;
    this.date = this.dateToParse;
    this.description = activity.description;
    this.selectedLabels = activity.selectedLabels;
    this.selectedParticipants = activity.participants;
  }

//create and update
  handleCreateAndUpdate() {
    if (this.id) {
      this.updateActivity();
    } else {
      this.createActivity();
    }
    this.navController.back();
  }
  private createActivity() {
    this.date = new Date(this.dateToParse).toString();
    this.activityService.createActivity(this.activityName, this.selectedParticipants,
      this.selectedLabels, this.description, this.location, this.date).then(()=>{
      console.log('activity created')
    })
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
        selectedLabels: this.selectedLabels
      }
      this.activityService.updateActivity(this.id,activityToUpdate).then(()=>{
        console.log('activity updated')});
    }
    else{
      console.log('activity has no id field and can not be updated')
    }
  }

//handle label and participant selection
  isSelectedParticipant(familyMember: FamilyMember) {
    return this.selectedParticipants.some((p) => p === familyMember.id);
  }
  changeParticipantSelection(familyMember: FamilyMember) {
    if(this.isSelectedParticipant(familyMember)){
      const index = this.selectedParticipants.findIndex(p=>p === familyMember.id);
      if (index !== -1){
        this.selectedParticipants.splice(index, 1);
      }
    } else {
      this.selectedParticipants.push(familyMember.id);
    }
  }
  isSelectedLabel(label: Label) {
    return this.selectedLabels.some(l=>l === label.id);
  }
  changeLabelSelection(label: Label) {
    if(this.isSelectedLabel(label)){
      const index = this.selectedLabels.findIndex(l=>l === label.id);
      if (index !== -1){
        this.selectedLabels.splice(index, 1);
      }
    } else {
      this.selectedLabels.push(label.id);
    }
  }
}
