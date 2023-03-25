import {Injectable} from '@angular/core';
import {activityFilter} from '../../datatypes/filter';
import {Label} from '../../datatypes/label';
import {Activity} from '../../datatypes/activity';
import {FamilyMember} from '../../datatypes/familyMember';
import {uuid} from 'uuidv4';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  #activityList: Activity[] = [];

  constructor() {

  }
  private static activityMatchesFilter(activity: Activity, filter: activityFilter): boolean {
    return activityFilter.all === filter;
  }

  getAllToActivities(): Activity[] {
    return this.#activityList;
  }

  deleteActivity(id: string): void {
    this.#activityList = this.#activityList.filter(a => a.id !== id);
  }

  newActivity(name: string,  participants:FamilyMember[] = [], labels: Label[] = [],description: string, location: string, date:string): void {
    this.#activityList.push({
      name,
      id : uuid(),
      date,
      description,
      location,
      participants,
      labels
    });

  }

  updateActivity(updatedActivity: { date: string; activityName: string; location: string; id: string | null }): void {
    const activity = this.#activityList.find(a => a.id === updatedActivity.id);
    if (activity === undefined) {
      console.error('Trying to update a nonexistent activity.');
      return;
    }

    Object.assign(activity, updatedActivity);
  }

  getActivity(id: string): Activity | undefined {
    return this.#activityList.find(a => a.id === id);
  }
  getActivitiesByDate(date: string) {

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
