export interface IPlannedMenu {
  date: string;
  recipeId: string;
  id:string;
  familyId:string;
}

export class PlannedMenu {
  date!:string;
  recipeId!:string;
  id!: string;
  familyId!:string;

  constructor(obj:IPlannedMenu) {
    Object.assign(this, obj);
  }
}
