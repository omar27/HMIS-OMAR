
export interface IGraph {
  id?: number;
  diseaseIdentified?: string;
  cureSuggested?: string;
  testsSuggested?: string;
  appointmentScheduleId?: number;
}

export class Graph implements IGraph {
  constructor(
    public id?: number,
    public diseaseIdentified?: string,
    public cureSuggested?: string,
    public testsSuggested?: string,
    public appointmentScheduleId?: number
  ) {}
}
