import {Injectable} from '@angular/core';
import {Color, Label} from '../../datatypes/label';
import {RecepyService} from './recepy.service';
import {ActivityService} from './activity.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  #labels: Label[] = [];
  #id = 0;

  constructor(private recepyService: RecepyService, private activityService: ActivityService) {
    this.#labels.push({name: 'eenvoudig', color: Color.danger, id: 0});
    this.#labels.push({name: 'gezond', color: Color.primary, id: 1});
    this.#labels.push({name: 'Werk', color: Color.secondary, id: 2});
    this.#labels.push({name: 'Plezant voor iedereen', color: Color.success, id:3})

    this.#id = 4;
  }

  getAllLabels(): Label[] {
    return this.#labels;
  }

  getLabelById(id: number): Label | undefined {
    return this.getAllLabels().find(l => l.id === id);
  }

  deleteLabel(id: number): void {
    this.#labels = this.#labels.filter(l => l.id !== id);
    this.recepyService.deleteLabelFromRecepy(id);
    this.activityService.deleteLabelFromActivity(id);
  }

  createLabel(name: string, color: Color): void {
    this.#labels.push({
      name,
      color,
      id: this.#id
    });
    this.#id++;
  }
}
