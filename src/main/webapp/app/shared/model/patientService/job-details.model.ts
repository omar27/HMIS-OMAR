import { JobType } from 'app/shared/model/enumerations/job-type.model';

export interface IJobDetails {
  id?: number;
  designation?: string;
  grade?: number;
  type?: JobType;
  salary?: number;
  details?: string;
}

export class JobDetails implements IJobDetails {
  constructor(
    public id?: number,
    public designation?: string,
    public grade?: number,
    public type?: JobType,
    public salary?: number,
    public details?: string
  ) {}
}
