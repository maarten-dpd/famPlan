import { Injectable } from '@angular/core';
import {FamilyMember} from '../../datatypes/familyMember';
import {UUID} from 'angular2-uuid';
import {
  addDoc,
  collection, collectionData,
  CollectionReference,
  Firestore,
  query, setDoc, where
} from '@angular/fire/firestore';
import {first, firstValueFrom, Observable, take} from 'rxjs';
import {AuthService} from './auth.service';
import {Family} from '../../datatypes/family';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {


  currentUserId: string | undefined = this.authService.getCurrentUserId();
  currentFamilyId: string =this.getCurrentFamilyId();
  currentFamilyName:string | undefined = this.getCurrentFamilyName(this.currentFamilyId);
  currentFamilyMember!:FamilyMember


  constructor(private firestore:Firestore,
              private authService:AuthService) {
    this.setCurrentFamilyMember();
  }
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }

  //crud operation methods
  async addFamilyMember(firstName: string, lastName: string, email: string, userId:string){
    const newFamilyMember ={
      firstName:firstName,
      lastName: lastName,
      email:email,
      userId: userId,
      familyId: this.currentFamilyId,
      id: ''
    };
    const docRef = await addDoc(
      this.#getCollectionRef<FamilyMember>('familyMembers'),
      newFamilyMember
    );
    newFamilyMember.id = docRef.id
    await setDoc(docRef, newFamilyMember)
  }

  async setCurrentFamilyMember(){
    const tempCurrentFamilyMember = await firstValueFrom(this.getCurrentFamilyMemberByUserId().pipe(take(1)))
    this.currentFamilyMember = tempCurrentFamilyMember[0];
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
    if(this.currentFamilyName){
      return this.currentFamilyName ;
    }
    else{return ''}

  }
  getFamilyMembers(): Observable<FamilyMember[]> {
    return collectionData<FamilyMember>(
      query<FamilyMember>(
        this.#getCollectionRef('familyMembers')
      ),
      {idField: 'id'}
    );
  }

  getFamilyMembersByFamilyId(): Observable<FamilyMember[]> {
    return collectionData<FamilyMember>(
      query<FamilyMember>(
        this.#getCollectionRef('familyMembers'),
        where('familyId', '==', this.currentFamilyId)
      ),
      { idField: 'id' }
    );
  }

  private getCurrentFamilyId() {
    return '';
  }
  private getCurrentFamilyName(currentFamilyId: string | undefined) {
    return undefined;
  }
}



