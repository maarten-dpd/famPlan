import {Recepy} from './recepy';
import {ToDo} from './toDo';
import {Activity} from './activity';


export interface IDayPlan {
  id: string;
  date: Date;
  toDos: ToDo[];
  activities: Activity[];
  menu: Recepy;

}

export class DayPlan {

  id!: string;
  date!: string;
  toDos?:ToDo[];
  activities?:Activity[];
  menu?:Recepy;

  constructor(obj: IDayPlan) {
    Object.assign(this, obj);
  }
}
