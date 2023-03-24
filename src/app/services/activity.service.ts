import {Injectable} from '@angular/core';
import {activityFilter} from '../../datatypes/filter';
import {Label} from '../../datatypes/label';
import {Activity} from '../../datatypes/activity';
import {FamilyMember} from '../../datatypes/familyMember';

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

  newActivity(name: string,  participants:FamilyMember[] = [], labels: Label[] = [],description?: string, location?: string): void {
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

  getActivity(id: number): Activity | undefined {
    return this.#activityList.find(a => a.id === id);
  }

  getFilteredActivities(filter: activityFilter): Activity[] {
    return this.getAllToActivities()
      .filter(a => ActivityService.activityMatchesFilter(a, filter));
  }

  getNumberOfActivities(): number {
    return this.#activityList.length;
  }

  deleteLabelFromActivity(labelId: number) {

    this.#activityList.forEach(a => a.labels = a.labels.filter(l => l.id !== labelId));
  }

  getToActivitiesByLabel(labelId: number) {
    return this.#activityList.filter(a => a.labels.some(l => l.id === labelId));
  }
}
