export interface IPatient {
  id?: number;
  patientId?: string;
  isRegular?: boolean;
  departmentName?: string;
  departmentId?: number;
}

export class Patient implements IPatient {
  constructor(
    public id?: number,
    public patientId?: string,
    public isRegular?: boolean,
    public departmentName?: string,
    public departmentId?: number
  ) {
    this.isRegular = this.isRegular || false;
  }
}
