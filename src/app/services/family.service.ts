import { Injectable } from '@angular/core';
import {FamilyMember} from '../../datatypes/familyMember';
import {UUID} from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  #familyMembers: FamilyMember[] = [];
  familyName:string = 'Test family';

  constructor() {
    this.addFamilyMember('Pa', 'Testfamilie', 'pa@family.com');
    this.addFamilyMember('ma', 'Aangetrouwd', 'ma@family.com');
    this.addFamilyMember('Broer', 'Testfamilie', 'broer@family.com');
    this.addFamilyMember('Zus', 'Testfamilie', 'zus@family.com');
  }
  //crud operation methods
  addFamilyMember(firstName: string, lastName: string, email: string){
    this.#familyMembers.push({
      firstName,
      lastName,
      id: UUID.UUID(),
      email
    });
  }

  //get data methods
  getFamilyName(): string {
    return this.familyName ;
  }
  getFamilyMembers(): FamilyMember[] {
    return this.#familyMembers ;
  }

  //misc methods

  //methods for later use
  /*updateFamilyName(familyName:string){
    this.familyName = familyName;
  }*/
}



