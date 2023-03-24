import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
})
export class ToDoPage implements OnInit {
  id: any;
  toDoName: any;
  description: any;
  yearValues: any;
  deadline: any;
  showFrom: any;
  labels: any;
  selectedLabels: any;

  constructor() { }

  ngOnInit() {
  }

  handleCreateAndUpdate() {

  }
}
