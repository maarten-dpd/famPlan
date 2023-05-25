import {Label} from './label';

export interface IRecepy{
  name: string;
  id: string;
  ingredients: string[];
  prepTime: number;
  cookingTime: number;
  instructions: string[];
  description: string;
  labels: Label[];
  photoUrl: string;
  familyId:string;
}


export class Recipe {
  name!: string;
  id!: string;
  ingredients!: string[];
  prepTime!: number;
  cookingTime!: number;
  instructions!: string[];
  description!: string;
  labels:Label[]=[];
  photoUrl?: string;
  familyId?:string;

  constructor(obj: IRecepy) {
    Object.assign(this,obj);

  }

}
