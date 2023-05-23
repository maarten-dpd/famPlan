export interface IFamily{
  id: string;
name: string;
}

export class Family{
  id!: string;
  name!: string;

  constructor(obj: IFamily) {
    Object.assign(this,obj);

  }
}
