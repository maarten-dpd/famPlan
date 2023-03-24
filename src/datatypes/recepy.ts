import {Label} from './label';

export interface IRecepy{
  name: string;
  id: number;
  ingredients: string[];
  prepTime: number;
  cookingTime: number;
  instructions: string[];
  description: string;
  labels: Label[];

}


export class Recepy{
  name!: string;
  id!: number;
  ingredients!: string[];
  prepTime!: number;
  cookingTime!: number;
  instructions!: string[];
  description!: string;
  labels:Label[]=[]


  constructor(obj: IRecepy) {
    Object.assign(this,obj);

  }

}
