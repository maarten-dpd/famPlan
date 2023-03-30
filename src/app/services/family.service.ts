import { Injectable } from '@angular/core';
import {FamilyMember} from '../../datatypes/familyMember';
import {UUID} from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  #familyMembers: FamilyMember[] = [];
  familyName:string = 'Test family';


  constructor() { }

  getFamilyName(): string {
    return this.familyName ;
  }
  getFamilyMembers(): FamilyMember[] {
    return this.#familyMembers ;
  }
  addFamilyMember(firstName: string, lastName: string){
    this.#familyMembers.push({
      firstName,
      lastName,
      id: UUID.UUID()
    });
  }
  updateFamilyName(familyName:string){
    this.familyName = familyName;
  }
}



