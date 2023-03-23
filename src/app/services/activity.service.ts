import {Injectable} from '@angular/core';
import {ToDo} from '../../datatypes/toDo';
import {activityFilter, toDoFilter} from '../../datatypes/filter';
import {Label} from '../../datatypes/label';
import {Activity} from '../../datatypes/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  #activityList: Activity[] = [];

  #id = 0;

  constructor() {

  }

  private static activityMatchesFilter(activity: Activity, filter: activityFilter): boolean {
    if (activityFilter.all === filter) {
      return true;
    }

    return false;
  }

  getAllToActivities(): Activity[] {
    return this.#activityList;
  }

  deleteActivity(id: number): void {
    this.#activityList = this.#activityList.filter(a => a.id !== id);
  }

  newActivity(name: string,  participants:string[] = [], labels: Label[] = [],description?: string, location?: string): void {
    this.#activityList.push({
      name,
      id: this.#id,
      description,
      location,
      participants,
      labels
    });
    this.#id++;
  }
  updateActivity(updatedActivity: Activity): void {
    const activity = this.#activityList.find(a => a.id === updatedActivity.id);
    if (activity === undefined) {
      console.error('Trying to update a nonexistent activity.');
      return;
    }

    Object.assign(activity, updatedActivity);
  }

  getActivity(id: number): ToDo | undefined {
    return this.#toDoList.find(t => t.id === id);
  }

  getFilteredToDos(filter: toDoFilter): ToDo[] {
    return this.getAllToDos()
      .filter(t => ToDoService.toDoMatchesFilter(t, filter));
  }

  getNumberOfToDos(): number {
    return this.#toDoList.length;
  }

  deleteLabelFromToDo(labelId: number) {

    this.#toDoList.forEach(t => t.labels = t.labels.filter(l => l.id !== labelId));
  }

  getToDosByLabel(labelId: number) {
    return this.#toDoList.filter(t => t.labels.some(l => l.id === labelId));
  }
}
