import {Label} from './label';
import {FamilyMember} from './familyMember';

export interface IActivity {
  id: string;
  name:string;
  date: string;
  location: string;
  description: string;
  participants: FamilyMember[];
  labels:Label[];
  familyId: string;
}

export class Activity {

  id!: string;
  name!:string;
  date!:string;
  location!:string;
  description!:string;
  participants:FamilyMember[] = [];
  labels:Label[]=[];
  familyId?:string;

  constructor(obj:IActivity) {
    Object.assign(this, obj);
  }
}
