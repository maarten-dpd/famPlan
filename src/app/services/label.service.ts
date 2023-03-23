import {Injectable} from '@angular/core';
import {Color, Label} from '../../datatypes/label';
import {ToDoService} from './to-do.service';
import {RecepyService} from './recepy.service';
import {ActivityService} from './activity.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  #labels: Label[] = [];
  #id = 0;

  constructor(private toDoService: ToDoService, private recepyService: RecepyService, private activityService: ActivityService) {
    this.#labels.push({name: 'Dringend', color: Color.danger, id: 0});
    this.#labels.push({name: 'Studies', color: Color.primary, id: 1});
    this.#labels.push({name: 'Werk', color: Color.secondary, id: 2});

    this.#id = 3;
  }

  getAllLabels(): Label[] {
    return this.#labels;
  }

  getLabelById(id: number): Label | undefined {
    return this.getAllLabels().find(l => l.id === id);
  }

  deleteLabel(id: number): void {
    this.#labels = this.#labels.filter(l => l.id !== id);
    this.toDoService.deleteLabelFromToDo(id);
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
