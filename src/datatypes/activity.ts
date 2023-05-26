export interface IActivity {
  id: string;
  name:string;
  date: string;
  location: string;
  description: string;
  participants: string[];
  selectedLabels:string[];
  familyId: string;
}

export class Activity {

  id!: string;
  name!:string;
  date!:string;
  location!:string;
  description!:string;
  participants:string[] = [];
  selectedLabels:string[]=[];
  familyId?:string;

  constructor(obj:IActivity) {
    Object.assign(this, obj);
  }
}
