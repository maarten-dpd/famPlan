export interface IFamilyMember{
  firstName: string;
  lastName:string;
  id: string;
  email: string;
}


export class FamilyMember{
  firstName!: string;
  lastName!:string;
  id!: string;
  email!: string;



  constructor(obj: IFamilyMember) {
    Object.assign(this,obj);

  }

}
