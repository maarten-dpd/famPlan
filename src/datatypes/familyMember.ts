export interface IFamilyMember{
  firstName: string;
  lastName:string;
  id: number;
}


export class FamilyMember{
  firstName!: string;
  lastName!:string;
  id!: number;



  constructor(obj: IFamilyMember) {
    Object.assign(this,obj);

  }

}
