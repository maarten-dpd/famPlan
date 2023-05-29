import { Injectable } from '@angular/core';
import {FamilyMember} from '../../datatypes/familyMember';
import {
  addDoc,
  collection, collectionData,
  CollectionReference, doc, DocumentReference,
  Firestore,
  query, setDoc, updateDoc, where
} from '@angular/fire/firestore';
import { firstValueFrom, Observable, take} from 'rxjs';
import {Family} from '../../datatypes/family';

@Injectable({
  providedIn: 'root'
})

export class FamilyService {

  currentUserId: string | undefined;
  currentFamilyId!: string;
  currentFamilyMember!:FamilyMember |undefined;
  currentFamily!:Family[] |undefined;

  constructor(private firestore:Firestore) {

  }

//crud operation methods
  async createFamilyMember(firstName: string, lastName: string, email: string, userId:string, familyId?:string){
    if(this.currentFamilyId){
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
    else if(familyId){
      const newFamilyMember ={
        firstName:firstName,
        lastName: lastName,
        email:email,
        userId: userId,
        familyId: familyId,
        id: ''
      };
      const docRef = await addDoc(
        this.#getCollectionRef<FamilyMember>('familyMembers'),
        newFamilyMember
      );
      newFamilyMember.id = docRef.id
      await setDoc(docRef, newFamilyMember)
    }
    else{
      console.log('no current familyId, could not create member');
    }
  }
  async updateFamilyMember(id:string, familyMember: FamilyMember){
    await updateDoc(this.#getDocumentRef('familyMembers',id),familyMember)
  }
  async createFamilyAndReturnNewFamilyId(familyName:string){
    const newFamily={
      name: familyName,
      id:''
    };
    const docRef=await addDoc(
      this.#getCollectionRef('families'),
      newFamily
    );
    newFamily.id = docRef.id;
    await setDoc(docRef, newFamily);
    return newFamily.id;
  }
  async updateFamily(id:string, family:Family){
    await updateDoc(this.#getDocumentRef('families',id),family)
  }

// set data methods
  async setCurrentFamilyMember(){
    const tempCurrentFamilyMember = await firstValueFrom(this.getCurrentFamilyMemberByUserId().pipe(take(1)))
    this.currentFamilyMember = tempCurrentFamilyMember[0];
  }
  private setCurrentFamilyId() {
    if(this.currentFamilyMember){
      this.currentFamilyId= this.currentFamilyMember.familyId;
    }
  }
  async setCurrentFamily(){
    const tempCurrentFamily = await firstValueFrom((this.getAllFamilies().pipe(take(1))))
    this.currentFamily=tempCurrentFamily.filter(f=>f.id===this.currentFamilyId);
  }

//get data methods
  getCurrentFamilyMemberByUserId():Observable<FamilyMember[]>{
    return collectionData<FamilyMember>(
      query<FamilyMember>(
        this.#getCollectionRef('familyMembers'),
        where ('userId','==', this.currentUserId)
      ),
      {idField: 'id'}
    )
  }
  getAllFamilies():Observable<Family[]>{
    return collectionData<Family>(
      query<Family>(
        this.#getCollectionRef('families'),
      ),
      {idField: 'id'}
    )
  }
  getFamilyName(): string {
    if(this.currentFamily){

      return this.currentFamily[0].name;
    }
    else{
      return 'name was not found'
    }
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

//Misc methods
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }
  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<T>;
  }
  resetFamilyService() {
    this.currentFamilyMember = undefined;
    this.currentFamilyId = '';
    this.currentFamily = undefined;
  }
  setCurrentAttributes(userId:string|undefined) {
    if(userId){
      this.currentUserId = userId;
      this.setCurrentFamilyMember()
        .then(()=>{
          this.setCurrentFamilyId()}
        )
        .then(()=>{
          this.setCurrentFamily()}
        )
      }
    else{
      console.log('something went wrong with the login')
      //change by information modal
    }
  }
}



