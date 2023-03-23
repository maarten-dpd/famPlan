import {Label} from './label';

export interface IActivity {
  id: number;
  name:string;
  location: string;
  description: string;
  participants: string[];
  labels:Label[];



}

export class Activity {

  id!: number;
  name!:string;
  location?:string;
  description?:string;
  participants:string[] = [];
  labels:Label[]=[];



  constructor(obj: Activity) {
    Object.assign(this, obj);
  }
}
