import { Gender } from 'app/shared/model/enumerations/gender.model';
import { EntityType } from 'app/shared/model/enumerations/entity-type.model';

export interface IPersonalInfo {
  id?: number;
  cnic?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  gender?: Gender;
  age?: number;
  address?: string;
  city?: string;
  entityType?: EntityType;
  entityId?: number;
}

export class PersonalInfo implements IPersonalInfo {
  constructor(
    public id?: number,
    public cnic?: string,
    public firstName?: string,
    public lastName?: string,
    public phoneNumber?: string,
    public email?: string,
    public gender?: Gender,
    public age?: number,
    public address?: string,
    public city?: string,
    public entityType?: EntityType,
    public entityId?: number
  ) {}
}
