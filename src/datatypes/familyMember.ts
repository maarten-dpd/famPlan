export interface IFamilyMember{
  firstName: string;
  lastName:string;
  id: string;
  email: string;
  photoUrl:string;
}


export class FamilyMember{
  firstName!: string;
  lastName!:string;
  id!: string;
  email!: string;
  photoUrl?:string;



  constructor(obj: IFamilyMember) {
    Object.assign(this,obj);

  }
}
