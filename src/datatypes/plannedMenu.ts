export interface IPlannedMenu {
  date: string;
  recipeId: string;
  id:string;
}

export class PlannedMenu {
  date!:string;
  recipeId!:string;
  id!: string;

  constructor(obj:IPlannedMenu) {
    Object.assign(this, obj);
  }
}
