import {Injectable} from '@angular/core';
import {Label} from '../../datatypes/label';
import {Activity} from '../../datatypes/activity';
import {FamilyMember} from '../../datatypes/familyMember';
import {UUID} from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  #activityList: Activity[] = [];

  constructor() {

  }
 /* private static activityMatchesFilter(activity: Activity, filter: activityFilter): boolean {
    return activityFilter.all === filter;
  }*/

  getAllActivities(): Activity[] {
    return this.#activityList;
  }

  /*deleteActivity(id: string): void {
    this.#activityList = this.#activityList.filter(a => a.id !== id);
  }*/

  newActivity(name: string,  participants:FamilyMember[] = [], labels: Label[] = [],description: string, location: string, date:Date): void {
    this.#activityList.push({
      name,
      id : UUID.UUID(),
      date,
      description,
      location,
      participants,
      labels
    });

  }

  updateActivity(updatedActivity: { date: Date; activityName: string; location: string; id: string | null }): void {
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
  getActivitiesByDate(date: Date):Activity[] {
    return this.#activityList.filter(a =>a.date === date);
  }

  /*getFilteredActivities(filter: activityFilter): Activity[] {
    return this.getAllActivities()
      .filter(a => ActivityService.activityMatchesFilter(a, filter));
  }*/

  getNumberOfActivitiesOnDate(date: Date): number {
    let activitiesOnDate = this.getActivitiesByDate(date);
    return activitiesOnDate.length;
  }

  deleteLabelFromActivity(labelId: number) {

    this.#activityList.forEach(a => a.labels = a.labels.filter(l => l.id !== labelId));
  }

 /* getActivitiesByLabel(labelId: number) {
    return this.#activityList.filter(a => a.labels.some(l => l.id === labelId));
  }*/


}
