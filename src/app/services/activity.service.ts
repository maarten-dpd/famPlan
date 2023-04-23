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
    let b=0;
    let date = new Date();
    let activityName = 'activity '+ b;
    let activityDate = date;
    for (let i = 0; i<20;i++){
      activityDate = this.addDays(date,i)
     /* console.log('date after adding days' + date)*/
      let dateForActivity = activityDate.toString()
      for(let j = 0;j<2;j++){
        this.newActivity(activityName,[],[],'een activiteit met uitleg','ergens',dateForActivity)
      }
     /* console.log ('lijst na poging ' + i);
      console.log(this.getAllActivities());*/
      b++;
      activityName = 'activity ' + b;
      /*console.log (activityName);*/
    }

  }

  //crud operations methods
  deleteActivity(id: string) {
    console.log('activity service delete activity entered')
    this.#activityList = this.#activityList.filter(a => a.id !== id);
  }
  newActivity(name: string,  participants:FamilyMember[] = [], labels: Label[] = [],
              description: string, location: string, date:string): void {
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
  updateActivity(updatedActivity: {
                                    date: string;
                                    name: string;
                                    location: string;
                                    description:string;
                                    participants:FamilyMember[];
                                    labels: Label[];
                                    id: string | null }): void {
      const activity = this.#activityList.find(a => a.id === updatedActivity.id);
      if (activity === undefined) {
        console.error('Trying to update a nonexistent activity.');
        return;
      }
      Object.assign(activity, updatedActivity);
    }

  //get data methods
  getAllActivities(): Activity[] {
    return this.#activityList;
  }
  getActivity(id: string): Activity | undefined {
    return this.#activityList.find(a => a.id === id);
  }
  getActivitiesByDate(date: string):Activity[] {
    return this.#activityList.filter(a =>a.date.substring(0,10) === date.substring(0,10));
  }
  getNumberOfActivitiesOnDate(date: string): number {
    let activitiesOnDate = this.getActivitiesByDate(date);
    /*    console.log('date')
        console.log(date)
        console.log('found activity')
        console.log(activitiesOnDate)*/
    return activitiesOnDate.length;
  }

  //misc methods
  //add days method is used in the constructor to create a set of test activities
  addDays(date: Date, days: number): Date{
    date.setDate(date.getDate()+days);
    return date;
  }
  deleteLabelFromActivity(labelId: number) {

    this.#activityList.forEach(a => a.labels = a.labels.filter(l => l.id !== labelId));
  }

  //methods for future use

  /*getFilteredActivities(filter: activityFilter): Activity[] {
    return this.getAllActivities()
      .filter(a => ActivityService.activityMatchesFilter(a, filter));
  }*/
 /* getActivitiesByLabel(labelId: number) {
    return this.#activityList.filter(a => a.labels.some(l => l.id === labelId));
  }*/
/*  getActivityByName(name: string) {
    return this.#activityList.find(a => a.name === name);
  }*/
  /* private static activityMatchesFilter(activity: Activity, filter: activityFilter): boolean {
    return activityFilter.all === filter;
  }*/

}
