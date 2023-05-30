import {ApplicationRef,  Injectable} from '@angular/core';
import {Activity} from '../../datatypes/activity';
import {
  addDoc,
  collection, collectionData,
  CollectionReference,
  deleteDoc,
  doc, docData,
  DocumentReference,
  Firestore, query, setDoc, updateDoc, where
} from '@angular/fire/firestore';
import {FamilyService} from './family.service';
import {Subscription} from 'rxjs';
import {Recipe} from '../../datatypes/recipe';

@Injectable(
  {
  providedIn: 'root'
}
)
export class ActivityService {
  private count: number = 0;

  #activitySub!: Subscription;
  #activity: Activity[] = [];

  constructor(private firestore:Firestore,
              private familyService:FamilyService,
              private ref: ApplicationRef) {
    //subscribe to observable of all activities
    this.#activitySub = this.getAllActivities().subscribe(res=>{
      this.#activity = res;
      this.count++;
      this.ref.tick()
    })
  }

//crud operations methods
  async createActivity(name: string, participants:string[] = [], selectedLabels: string[] = [],
                       description: string, location: string, date:string) {
    const newActivity={
      name,
      id : '',
      date,
      description,
      location,
      participants,
      selectedLabels,
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
  async deleteActivity(id: string) {
    await deleteDoc(this.#getDocumentRef('activities', id));
  }

//get data methods
  private getAllActivities() {
    return collectionData<Activity>(
      query<Activity>(
        this.#getCollectionRef('activities')
      )
    )
  }
  getActivityByIdFromDb(id: string){
    return collectionData<Activity>(
      query<Activity>(
        this.#getCollectionRef('activities'),
        where('id','==',id)
      ),
      {idField: 'id'}
    );
  }
  // getActivityByIdFromDb(id:string){
  //   return docData<Activity>(
  //     this.#getDocumentRef('activities',id),
  //     {idField: 'id'}
  //   )
  // }
  //in this service all methods are filtering on the observable that is kept in the service
  getAllActivitiesForCurrentFamily() {
   return this.#activity
     .filter(a=>a.familyId === this.familyService.currentFamilyId);
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
  getAllActivitiesForCurrentFamilyFromDatabase(){
    return collectionData<Activity>(
      query<Activity>(
        this.#getCollectionRef('activities'),
        where('familyId','==',this.familyService.currentFamilyId)
      ),
      {idField: 'id'}
    );
  }
  getActivitiesByDateForCurrentFamily(date: string) {
    return this.getAllActivitiesForCurrentFamily()
      .filter(a=>a.date.substring(0,10) === date.substring(0,10));
  }
  getNumberOfActivitiesOnDate(date: string) {
    return this.getActivitiesByDateForCurrentFamily(date).length;
  }

//misc methods
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }
  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<T>;
  }
  labelIsInUse(id: string) {
    const activities = this.getAllActivities();
    let result = false
    activities.subscribe(activities =>{
        for (const activity of activities){
          const labelUsed = activity.selectedLabels.some(label =>label === id);
          if(labelUsed){
            result = true;
          }
        }
      }
    )
    return result;
  }

}
