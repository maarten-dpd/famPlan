import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.page.html',
  styleUrls: ['./day-menu.page.scss'],
})
export class DayMenuPage implements OnInit {
  familyName: any;
  date: any;
  menu: any = null;
  ingredient: any;
  numberOfPersons: any;
  step: any;

  constructor() { }

  ngOnInit() {
  }

}
