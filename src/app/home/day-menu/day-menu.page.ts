import { Component, OnInit } from '@angular/core';
import {Recepy} from '../../../datatypes/recepy';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.page.html',
  styleUrls: ['./day-menu.page.scss'],
})
export class DayMenuPage implements OnInit {
  familyName: any;
  date: any;
  menu: Recepy = {name:"new",id:'',ingredients:[""],cookingTime:0, prepTime:0, instructions:[''], labels:[], description:''};


  constructor() { }

  ngOnInit() {
  }

}
