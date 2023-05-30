import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FamilyService} from '../../../services/family.service';
import {LabelService} from '../../../services/label.service';
import {ActivityService} from '../../../services/activity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Label} from '../../../../datatypes/label';
import {FamilyMember} from '../../../../datatypes/familyMember';
import {Activity} from '../../../../datatypes/activity';
import {firstValueFrom} from 'rxjs';

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
  familyMembers: FamilyMember[]=[];
  participants: FamilyMember[]=[];
  selectedParticipants: string[] = [];
  labels: Label[]=[];
  selectedLabels: string[] =[];
  yearValues: number[] = []
  protected readonly Number = Number;

//constructor
  constructor(public familyService: FamilyService,
              public labelService: LabelService,
              public activityService: ActivityService,
              public activatedRoute : ActivatedRoute,
              public router: Router
  ) {
    //this code is needed to create the calendar to pick a date
    const currentYear:number = (new Date().getFullYear());
    for (let year = currentYear; year<(currentYear + 100); year++){
      this.yearValues.push(year);
    }
  }

//On Init/Destroy/set Data
  async ngOnInit() {
    await this.setData();
  }
  ngOnDestroy(){
  }
  private async setData() {
    this.familyMembers = await firstValueFrom(this.familyService.getFamilyMembersByFamilyId());
    this.labels = await firstValueFrom(this.labelService.getLabelsByType('activity'));
    this.labels.sort((a,b)=>a.name.localeCompare(b.name));

    //check if page is needed for update or create
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if(this.id===null){
      return;
    }
    await this.activityService.getActivityByIdFromDb(this.id).subscribe((activities)=>{
      if(activities && activities.length>0){
        const activity =activities[0] ;
        this.dateToParse = new Date(activity.date).toISOString();
        this.activityName = activity.name;
        this.location = activity.location;
        this.date = this.dateToParse;
        this.description = activity.description;
        this.selectedLabels = activity.selectedLabels;
        this.selectedParticipants = activity.participants;
      }
    })
  }

//create and update
  async handleCreateAndUpdate() {
    if (this.id) {
      this.updateActivity();
    } else {
      this.createActivity();
    }
    let dateToNavigate = new Date(this.dateToParse).toString()
    console.log(dateToNavigate)
    await this.router.navigate(['/home','activities-list',dateToNavigate]);
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
