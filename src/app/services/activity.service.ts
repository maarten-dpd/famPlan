import {ApplicationRef, ChangeDetectorRef, Injectable} from '@angular/core';
import {Label} from '../../datatypes/label';
import {Activity} from '../../datatypes/activity';
import {FamilyMember} from '../../datatypes/familyMember';
import {
  addDoc,
  collection, collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore, query, setDoc, updateDoc, where
} from '@angular/fire/firestore';
import {FamilyService} from './family.service';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private count: number = 0;

  #activitySub!: Subscription;
  #activity: Activity[] = [];

  constructor(private firestore:Firestore,
              private familyService:FamilyService,
              private ref: ApplicationRef) {
    this.#activitySub = this.getAllActivities().subscribe(res=>{
      this.#activity = res;
      this.count++;
      this.ref.tick()
    })
  }
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }
  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<T>;
  }
  //crud operations methods
  async deleteActivity(id: string) {
    await deleteDoc(this.#getDocumentRef('activities', id));
  }
  async newActivity(name: string,  participants:FamilyMember[] = [], labels: Label[] = [],
              description: string, location: string, date:string) {
    const newActivity={
      name,
      id : '',
      date,
      description,
      location,
      participants,
      labels,
      familyId: this.familyService.currentFamilyId
    };
    const docRef = await addDoc(
      this.#getCollectionRef<Activity>('activities'),
      newActivity
    );
    newActivity.id = docRef.id
   await setDoc(docRef, newActivity);
  }
  async updateActivity(id: string, activity:Activity){
    await updateDoc(this.#getDocumentRef('activities', id),activity)
    }
  //get data methods
  private getAllActivities() {
    return collectionData<Activity>(
      query<Activity>(
        this.#getCollectionRef('activities')
      )
    )
  }
  getAllActivitiesForCurrentFamily() {
   let activitiesForCurrentFamily = this.#activity
     .filter(a=>a.familyId === this.familyService.currentFamilyId);
   return activitiesForCurrentFamily;
  }
  getActivityById(id: string) {
    let activitiesById = this.#activity
      .filter(a =>a.id === id);
    return activitiesById[0];
    // return collectionData<Activity>(
    //   query<Activity>(
    //     this.#getCollectionRef('activities'),
    //     where('id', '==', id)
    //   )
    // )
  }
  getActivitiesByDateForCurrentFamily(date: string) {
    let activitiesByDateForCurrentFamily = this.getAllActivitiesForCurrentFamily()
      .filter(a=>a.date.substring(0,10) === date.substring(0,10));
    return activitiesByDateForCurrentFamily;
    // return collectionData<Activity>(
    //   query<Activity>(
    //     this.#getCollectionRef('activities'),
    //     where('date', '==', date.substring(0,10))
    //   )
    // )
  }
  getNumberOfActivitiesOnDate(date: string) {
    return this.getActivitiesByDateForCurrentFamily(date).length;
  }
  //misc methods
  labelIsInUse(id: string) {
    const activities = this.getAllActivities();
    let result = false
    activities.subscribe(activities =>{
        for (const activity of activities){
          const labelUsed = activity.labels.some(label =>label.id === id);
          if(labelUsed){
            result = true;
          }
        }
      }
    )
    return result;
  }

}
