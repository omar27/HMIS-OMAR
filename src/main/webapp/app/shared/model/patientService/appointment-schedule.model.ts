import { Moment } from 'moment';
import { AppointmentScheduleStatus } from 'app/shared/model/enumerations/appointment-schedule-status.model';

export interface IAppointmentSchedule {
  id?: number;
  status?: AppointmentScheduleStatus;
  scheduledDate?: Moment;
  patientId?: number;
  staffId?: number;
  scheduledById?: number;
}

export class AppointmentSchedule implements IAppointmentSchedule {
  constructor(
    public id?: number,
    public status?: AppointmentScheduleStatus,
    public scheduledDate?: Moment,
    public patientId?: number,
    public staffId?: number,
    public scheduledById?: number
  ) {}
}
