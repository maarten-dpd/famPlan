import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {RecepyService} from '../../services/recepy.service';
import {ActivatedRoute} from '@angular/router';
import {LabelService} from '../../services/label.service';


@Component({
  selector: 'app-recepy',
  templateUrl: './recepy.page.html',
  styleUrls: ['./recepy.page.scss'],
})
export class RecepyPage implements OnInit {
  recepyName: string = '';
  prepTime: number = 0;
  cookingTime: number = 0;
  description: string = '';
  labels= this.labelService.getAllLabels();
  selectedLabels: boolean[] = Array(this.labels.length).fill(false);
  ingredients: string[] = [];
  instructions: string[] =[];
  id?: string = undefined;


  constructor(public navController: NavController, public recepyService: RecepyService,
              public activatedRoute: ActivatedRoute, public labelService: LabelService,) {


  }
  ngOnInit() {
  }

  handleCreateAndUpdate() {

  }
}
