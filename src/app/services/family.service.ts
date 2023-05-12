import { Injectable } from '@angular/core';
import {FamilyMember} from '../../datatypes/familyMember';
import {UUID} from 'angular2-uuid';
import {
  addDoc,
  collection, collectionData,
  CollectionReference,
  Firestore,
  query
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  familyName:string = 'Test family';

  constructor(private firestore:Firestore) {

  }
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }

  //crud operation methods
  async addFamilyMember(firstName: string, lastName: string, email: string){
    const newFamilyMember ={
      firstName:firstName,
      lastName: lastName,
      email:email,
      id: UUID.UUID()
    };
    await addDoc(
      this.#getCollectionRef<FamilyMember>('familyMembers'),
      newFamilyMember
    );
  }

  //get data methods
  getFamilyName(): string {
    return this.familyName ;
  }
  getFamilyMembers(): Observable<FamilyMember[]> {
    return collectionData<FamilyMember>(
      query<FamilyMember>(
        this.#getCollectionRef('familyMembers')
      ),
      {idField: 'id'}
    );
  }
  //misc methods

  //methods for later use
  /*updateFamilyName(familyName:string){
    this.familyName = familyName;
  }*/
}



