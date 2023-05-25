import { Injectable } from '@angular/core';
import {FamilyMember} from '../../datatypes/familyMember';
import {
  addDoc,
  collection, collectionData,
  CollectionReference, deleteDoc, doc, DocumentReference,
  Firestore,
  query, setDoc, updateDoc, where
} from '@angular/fire/firestore';
import { firstValueFrom, Observable, take} from 'rxjs';
import {AuthService} from './auth.service';
import {Family} from '../../datatypes/family';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  currentUserId: string | undefined = this.authService.getCurrentUserId();
  currentFamilyId!: string;
  currentFamilyMember!:FamilyMember |undefined;
  currentFamily!:Family |undefined;

  constructor(private firestore:Firestore,
              private authService:AuthService) {
    this.setFamilyService()
  }

  //crud operation methods
  async createFamilyMember(firstName: string, lastName: string, email: string, userId:string){
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
  async updateFamilyMember(id:string, familyMember: FamilyMember){
    await updateDoc(this.#getDocumentRef('familyMembers',id),familyMember)
  }
  async deleteFamilyMember(id:string){
    await deleteDoc(this.#getDocumentRef('familyMembers', id))
  }
  async createFamily(familyName:string){
    const newFamily={
      familyName: familyName,
      id:''
    };
    const docRef=await addDoc(
      this.#getCollectionRef('families'),
      newFamily
    );
    newFamily.id = docRef.id
    await setDoc(docRef, newFamily)
  }
  async updateFamily(id:string, family:Family){
    await updateDoc(this.#getDocumentRef('families',id),family)
  }
  //because of the impact and spread of familyId in other collections there is no deleteFamily

  //set data methods
  async setCurrentFamilyMember(){
    const tempCurrentFamilyMember = await firstValueFrom(this.getCurrentFamilyMemberByUserId().pipe(take(1)))
    this.currentFamilyMember = tempCurrentFamilyMember[0];
    console.log('the current logged in familyMember = ');
    console.log(this.currentFamilyMember.firstName + this.currentFamilyMember.lastName)
  }
  private setCurrentFamilyId() {
    if(this.currentFamilyMember){
      this.currentFamilyId= this.currentFamilyMember.familyId;
      console.log('the current FamilyID = ');
      console.log(this.currentFamilyId)
    }
  }
  async setCurrentFamily(){
    const tempCurrentFamily = await firstValueFrom((this.getCurrentFamilyByFamilyId().pipe(take(1))))
    this.currentFamily=tempCurrentFamily[0];
    console.log('the current Family = ');
    console.log(this.currentFamily.name)
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
  getCurrentFamilyByFamilyId():Observable<Family[]>{
    return collectionData<Family>(
      query<Family>(
        this.#getCollectionRef('families'),
        // where (documentId(),'==',this.currentFamilyId)
      ),
      {idField: 'id'}
    )
  }
  getFamilyName(): string {
    if(this.currentFamily){
      return this.currentFamily.name;
    }
    else{
      return 'name was not found'
    }
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
  getFamilymemberById(id: string) {
    return collectionData<FamilyMember>(
      query<FamilyMember>(
        this.#getCollectionRef('familyMembers'),
        where ('userId','==', id)
      ),
      {idField: 'id'}
    )
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

  setFamilyService() {
    this.setCurrentFamilyMember()
      .then(()=>{
        this.setCurrentFamilyId()}
      )
      .then(()=>{
        this.setCurrentFamily()}
      )
  }


}



