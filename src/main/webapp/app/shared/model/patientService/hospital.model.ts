export interface IHospital {
  id?: number;
  name?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  registrationNumber?: string;
}

export class Hospital implements IHospital {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public address?: string,
    public phoneNumber?: string,
    public registrationNumber?: string
  ) {}
}
