import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';

@Component({
  selector: 'jhi-appointment-schedule-detail',
  templateUrl: './appointment-schedule-detail.component.html'
})
export class AppointmentScheduleDetailComponent implements OnInit {
  appointmentSchedule: IAppointmentSchedule;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ appointmentSchedule }) => {
      this.appointmentSchedule = appointmentSchedule;
    });
  }

  previousState() {
    window.history.back();
  }
}
