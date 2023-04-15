export interface IPlannedMenu {
  date: string;
  recipeId: string;
}

export class PlannedMenu {
  date!:string;
  recipeId!:string;

  constructor(obj:IPlannedMenu) {
    Object.assign(this, obj);
  }
}
