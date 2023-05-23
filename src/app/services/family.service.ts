import { Injectable } from '@angular/core';
import {FamilyMember} from '../../datatypes/familyMember';
import {UUID} from 'angular2-uuid';
import {
  addDoc,
  collection, collectionData,
  CollectionReference,
  Firestore,
  query, where
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from 'firebase/auth';
import {Family} from '../../datatypes/family';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  familyName:string = 'Test family';
  currentUserId: string | undefined = this.authService.getCurrentUserId();


  constructor(private firestore:Firestore,
              private authService:AuthService) {

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
  getFamilyMemberByUserId(userId: string):Observable<FamilyMember[]>{
    return collectionData<FamilyMember>(
      query<FamilyMember>(
        this.#getCollectionRef('familyMembers'),
        where ('userId','==', userId)
      ),
      {idField: 'id'}
    )
  }
  getCurrentFamilyMemberByUserId():Observable<FamilyMember[]>{
    return collectionData<FamilyMember>(
      query<FamilyMember>(
        this.#getCollectionRef('familyMembers'),
        where ('userId','==', this.currentUserId)
      ),
      {idField: 'id'}
    )
  }
  getFamilyById(familyId: string):Observable<Family[]>{
    return collectionData<Family>(
      query<Family>(
        this.#getCollectionRef('families'),
        where('id','==', familyId)
      ),
      {idField: 'id'}
    )
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

  getFamilyMembersByFamilyId(familyId: string): Observable<FamilyMember[]> {
    return collectionData<FamilyMember>(
      query<FamilyMember>(
        this.#getCollectionRef('familyMembers'),
        where('familyId', '==', familyId)
      ),
      { idField: 'id' }
    );
  }
}



