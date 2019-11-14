import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStaffWorkingSchedule } from 'app/shared/model/patientService/staff-working-schedule.model';

@Component({
  selector: 'jhi-staff-working-schedule-detail',
  templateUrl: './staff-working-schedule-detail.component.html'
})
export class StaffWorkingScheduleDetailComponent implements OnInit {
  staffWorkingSchedule: IStaffWorkingSchedule;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ staffWorkingSchedule }) => {
      this.staffWorkingSchedule = staffWorkingSchedule;
    });
  }

  previousState() {
    window.history.back();
  }
}
