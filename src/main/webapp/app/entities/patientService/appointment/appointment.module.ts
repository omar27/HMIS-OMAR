import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { AppointmentComponent } from './appointment.component';
import { AppointmentDetailComponent } from './appointment-detail.component';
import { AppointmentUpdateComponent } from './appointment-update.component';
import { AppointmentDeletePopupComponent, AppointmentDeleteDialogComponent } from './appointment-delete-dialog.component';
import { appointmentRoute, appointmentPopupRoute } from './appointment.route';

const ENTITY_STATES = [...appointmentRoute, ...appointmentPopupRoute];

@NgModule({
  imports: [HmisgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AppointmentComponent,
    AppointmentDetailComponent,
    AppointmentUpdateComponent,
    AppointmentDeleteDialogComponent,
    AppointmentDeletePopupComponent
  ],
  entryComponents: [AppointmentDeleteDialogComponent]
})
export class PatientServiceAppointmentModule {}
