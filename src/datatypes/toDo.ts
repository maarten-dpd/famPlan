import {Label} from './label';

export interface IToDo {
  name: string;
  id: number;
  done: boolean;
  description?: string;
  showFrom:string;
  deadline: string;
  labels: Label[];
}


export class ToDo {
  done!: boolean;
  id!: number;
  name!: string;
  description?: string;

  deadline!: string;
  labels: Label[]=[];

  constructor(obj: Task) {
    Object.assign(this, obj);
  }
}
