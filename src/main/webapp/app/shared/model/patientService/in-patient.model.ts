import { Moment } from 'moment';

export interface IInPatient {
  id?: number;
  admitDate?: Moment;
  dischargeDate?: Moment;
  roomId?: number;
  suggestedById?: number;
  patientId?: number;
}

export class InPatient implements IInPatient {
  constructor(
    public id?: number,
    public admitDate?: Moment,
    public dischargeDate?: Moment,
    public roomId?: number,
    public suggestedById?: number,
    public patientId?: number
  ) {}
}
