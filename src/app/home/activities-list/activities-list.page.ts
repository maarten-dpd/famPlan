import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.page.html',
  styleUrls: ['./activities-list.page.scss'],
})
export class ActivitiesListPage implements OnInit {
  familyName: string;
  date: string;
  activityList: any[] = [];

  constructor() {
    this.familyName = 'family name';
    this.date='2023-01-01';
  }

  ngOnInit() {
  }

}
