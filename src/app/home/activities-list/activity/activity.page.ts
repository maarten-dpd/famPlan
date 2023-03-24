import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  familyName: any;
  activityName: any;
  date: any;
  id: any;
  description: any;
  activityLocation: any;
  participants: any;
  selectedParticipants: any;
  familyMember: any;
  labels: any;
  selectedLabels: any;

  constructor() { }

  ngOnInit() {
  }

  handleCreateAndUpdate() {

  }
}
