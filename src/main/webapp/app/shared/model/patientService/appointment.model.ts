import { PatientStatus } from 'app/shared/model/enumerations/patient-status.model';

export interface IAppointment {
  id?: number;
  patientStatus?: PatientStatus;
  diseaseIdentified?: string;
  cureSuggested?: string;
  testsSuggested?: string;
  appointmentScheduleId?: number;
  billId?: number;
}

export class Appointment implements IAppointment {
  constructor(
    public id?: number,
    public patientStatus?: PatientStatus,
    public diseaseIdentified?: string,
    public cureSuggested?: string,
    public testsSuggested?: string,
    public appointmentScheduleId?: number,
    public billId?: number
  ) {}
}
