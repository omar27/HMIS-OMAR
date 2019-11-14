import { Moment } from 'moment';
import { StaffType } from 'app/shared/model/enumerations/staff-type.model';

export interface IStaff {
  id?: number;
  staffType?: StaffType;
  qualification?: string;
  joiningDate?: Moment;
  experience?: number;
  isRegular?: boolean;
  departmentName?: string;
  departmentId?: number;
  jobDetailsId?: number;
  staffWorkingScheduleId?: number;
}

export class Staff implements IStaff {
  constructor(
    public id?: number,
    public staffType?: StaffType,
    public qualification?: string,
    public joiningDate?: Moment,
    public experience?: number,
    public isRegular?: boolean,
    public departmentName?: string,
    public departmentId?: number,
    public jobDetailsId?: number,
    public staffWorkingScheduleId?: number
  ) {
    this.isRegular = this.isRegular || false;
  }
}
