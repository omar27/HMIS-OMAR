import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { AppointmentScheduleComponent } from './appointment-schedule.component';
import { AppointmentScheduleDetailComponent } from './appointment-schedule-detail.component';
import { AppointmentScheduleUpdateComponent } from './appointment-schedule-update.component';
import {
  AppointmentScheduleDeletePopupComponent,
  AppointmentScheduleDeleteDialogComponent
} from './appointment-schedule-delete-dialog.component';
import { appointmentScheduleRoute, appointmentSchedulePopupRoute } from './appointment-schedule.route';

const ENTITY_STATES = [...appointmentScheduleRoute, ...appointmentSchedulePopupRoute];

@NgModule({
  imports: [HmisgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AppointmentScheduleComponent,
    AppointmentScheduleDetailComponent,
    AppointmentScheduleUpdateComponent,
    AppointmentScheduleDeleteDialogComponent,
    AppointmentScheduleDeletePopupComponent
  ],
  entryComponents: [AppointmentScheduleDeleteDialogComponent]
})
export class PatientServiceAppointmentScheduleModule {}
