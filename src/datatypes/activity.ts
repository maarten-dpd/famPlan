import {Label} from './label';
import {FamilyMember} from './familyMember';

export interface IActivity {
  id: number;
  name:string;
  location: string;
  description: string;
  participants: FamilyMember[];
  labels:Label[];



}

export class Activity {

  id!: number;
  name!:string;
  location?:string;
  description?:string;
  participants:FamilyMember[] = [];
  labels:Label[]=[];

  constructor(obj: Activity) {
    Object.assign(this, obj);
  }
}
