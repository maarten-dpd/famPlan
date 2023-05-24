import { Injectable } from '@angular/core';
import {FamilyMember} from '../../datatypes/familyMember';
import {
  addDoc,
  collection, collectionData,
  CollectionReference, doc, documentId,
  Firestore, getDoc,
  query, setDoc, where
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
  currentFamilyMember!:FamilyMember;
  currentFamily!:Family;


  constructor(private firestore:Firestore,
              private authService:AuthService) {
    this.setCurrentFamilyMember()
      .then(()=>{
        this.setCurrentFamilyId()}
      )
      .then(()=>{
        console.log('currentfamilyID = ' + this.currentFamilyId);
        // console.log(this.getFamilyById(this.currentFamilyId));
        this.setCurrentFamily();
        console.log(this.currentFamily)}
      );
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
  //set data methods
  async setCurrentFamilyMember(){
    const tempCurrentFamilyMember = await firstValueFrom(this.getCurrentFamilyMemberByUserId().pipe(take(1)))
    this.currentFamilyMember = tempCurrentFamilyMember[0];
  }
  async setCurrentFamily(){
    const tempCurrentFamily = await firstValueFrom((this.getCurrentFamilyByFamilyId().pipe(take(1))))
    this.currentFamily=tempCurrentFamily[0];
  }
  private setCurrentFamilyId() {
    this.currentFamilyId= this.currentFamilyMember.familyId;
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
  // async getFamilyById(familyId:string){
  //   const docRef = doc(this.firestore,'families', familyId)
  //   const docSnap = await getDoc(docRef);
  //   docSnap.data();
  // }
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

}



