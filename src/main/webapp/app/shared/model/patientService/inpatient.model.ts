import { Moment } from 'moment';

export interface IInpatient {
  id?: number;
  admitDate?: Moment;
  dischargeDate?: Moment;
}

export class Inpatient implements IInpatient {
  constructor(public id?: number, public admitDate?: Moment, public dischargeDate?: Moment) {}
}
