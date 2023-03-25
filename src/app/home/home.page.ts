import { Component } from '@angular/core';
import {DayPlan} from '../../datatypes/dayPlan';
import {NavController} from '@ionic/angular';
import {DayMenuPage} from './day-menu/day-menu.page';
import {DayToDoListPage} from './day-to-do-list/day-to-do-list.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dayList: DayPlan[] = [
    {id:"1",date:'2023-03-20'},
    {id:"2",date:'2023-03-21'},
    {id:"3",date:'2023-03-22'},
    {id:"4",date:'2023-03-23'},
    {id:"5",date:'2023-03-24'},
    {id:"6",date:'2023-03-25'},
    {id:"7",date:'2023-03-26'}
    ];
  familyName: string = '';
  currentWeek: string = '';


  constructor(public navCtrl: NavController) {
    this.familyName = 'statische data test'
    this.currentWeek = 'te berekenen'

  }


}
