export interface IFamilyMember{
  firstName: string;
  lastName:string;
  id: string;
}


export class FamilyMember{
  firstName!: string;
  lastName!:string;
  id!: string;



  constructor(obj: IFamilyMember) {
    Object.assign(this,obj);

  }

}
