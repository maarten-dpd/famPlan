import {Recepy} from './recepy';
import {ToDo} from './toDo';
import {Activity} from './activity';


export interface IDayPlan {
  id: number;
  date: Date;
  toDos: ToDo[];
  activities: Activity[];
  Menu: Recepy;

}

export class DayPlan {

  id!: number;
  date!: string;
  toDos?:ToDo[];
  activities?:Activity[];
  menu?:Recepy;

  constructor(obj: IDayPlan) {
    Object.assign(this, obj);
  }
}
