import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkingSchedule } from 'app/shared/model/patientService/working-schedule.model';

@Component({
  selector: 'jhi-working-schedule-detail',
  templateUrl: './working-schedule-detail.component.html'
})
export class WorkingScheduleDetailComponent implements OnInit {
  workingSchedule: IWorkingSchedule;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ workingSchedule }) => {
      this.workingSchedule = workingSchedule;
    });
  }

  previousState() {
    window.history.back();
  }
}
