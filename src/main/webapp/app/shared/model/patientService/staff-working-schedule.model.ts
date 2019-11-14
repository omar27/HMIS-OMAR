export interface IStaffWorkingSchedule {
  id?: number;
  description?: string;
  staffId?: number;
  workingScheduleDay?: string;
  workingScheduleId?: number;
}

export class StaffWorkingSchedule implements IStaffWorkingSchedule {
  constructor(
    public id?: number,
    public description?: string,
    public staffId?: number,
    public workingScheduleDay?: string,
    public workingScheduleId?: number
  ) {}
}
