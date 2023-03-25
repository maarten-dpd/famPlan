import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {RecepyService} from '../../services/recepy.service';
import {ActivatedRoute} from '@angular/router';
import {LabelService} from '../../services/label.service';
import {Label} from '../../../datatypes/label';


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
  id: string | null ='';


  constructor(public navController: NavController, public recepyService: RecepyService,
              public activatedRoute: ActivatedRoute, public labelService: LabelService,) {


  }
  ngOnInit() {
    this.setData();
  }

  setData(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');


    if (this.id === null) {
      return;
    }

    const recepy = this.recepyService.getRecepyById(this.id);
    if(recepy){
      this.recepyName = recepy.name;
      this.prepTime = recepy.prepTime;
      this.cookingTime = recepy.cookingTime;
      this.ingredients = recepy.ingredients;
      this.instructions = recepy.instructions;
      this.description = recepy.description;
      this.selectedLabels = this.labels.map(l => !!recepy.labels.find(l2 => l2.id === l.id));
    }

  }

    handleCreateAndUpdate(): void {
    if (this.id) {
      this.updateRecepy();
    } else {
      this.createRecepy();
    }
    this.navController.back();
  }

  private createRecepy(): void {
    this.recepyService.newRecepy(this.recepyName,this.ingredients,this.prepTime,this.cookingTime, this.instructions, this.description, this.getSelectedLabels());
  }

  private updateRecepy(): void {
    this.recepyService.updateRecepy({
      id: this.id,
      name: this.recepyName,
      cookingTime: this.cookingTime,
      description: this.description,
      prepTime: this.prepTime,
      ingredients: this.ingredients,
      instructions:this.instructions,
      labels: this.getSelectedLabels(),
    });
  }

  private getSelectedLabels(): Label[] {
    return this.labels.filter((l, i) => this.selectedLabels[i]);
  }
}
