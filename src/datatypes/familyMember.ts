export interface IFamilyMember{
  firstName: string;
  lastName:string;
  id: string;
  email: string;
  userId:string;
  familyId:string;
}


export class FamilyMember{
  firstName!: string;
  lastName!:string;
  id!: string;
  email!: string;
  userId?:string;
  familyId!:string;

  constructor(obj: IFamilyMember) {
    Object.assign(this,obj);

  }
}
