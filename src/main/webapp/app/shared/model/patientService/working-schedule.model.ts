import { Days } from 'app/shared/model/enumerations/days.model';

export interface IWorkingSchedule {
  id?: number;
  day?: Days;
  isOff?: boolean;
  startTime?: string;
  end?: string;
}

export class WorkingSchedule implements IWorkingSchedule {
  constructor(public id?: number, public day?: Days, public isOff?: boolean, public startTime?: string, public end?: string) {
    this.isOff = this.isOff || false;
  }
}
