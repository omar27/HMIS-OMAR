import { RoomCategory } from 'app/shared/model/enumerations/room-category.model';

export interface IRoom {
  id?: number;
  category?: RoomCategory;
  rent?: number;
  roomId?: string;
  availablity?: boolean;
  departmentId?: number;
}

export class Room implements IRoom {
  constructor(
    public id?: number,
    public category?: RoomCategory,
    public rent?: number,
    public roomId?: string,
    public availablity?: boolean,
    public departmentId?: number
  ) {
    this.availablity = this.availablity || false;
  }
}
