export interface IDepartment {
  id?: number;
  name?: string;
  address?: string;
  details?: string;
}

export class Department implements IDepartment {
  constructor(public id?: number, public name?: string, public address?: string, public details?: string) {}
}
