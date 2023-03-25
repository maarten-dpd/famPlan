import {Label} from './label';

export interface IToDo {
  name: string;
  id: string;
  done: boolean;
  description?: string;
  showFrom:string;
  deadline: string;
  labels: Label[];
}


export class ToDo {
  done!: boolean;
  id!: string;
  name!: string;
  description?: string;

  deadline!: string;
  labels: Label[]=[];

  constructor(obj: Task) {
    Object.assign(this, obj);
  }
}
