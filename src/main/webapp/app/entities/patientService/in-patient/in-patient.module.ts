import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { InPatientComponent } from './in-patient.component';
import { InPatientDetailComponent } from './in-patient-detail.component';
import { InPatientUpdateComponent } from './in-patient-update.component';
import { InPatientDeletePopupComponent, InPatientDeleteDialogComponent } from './in-patient-delete-dialog.component';
import { inPatientRoute, inPatientPopupRoute } from './in-patient.route';

const ENTITY_STATES = [...inPatientRoute, ...inPatientPopupRoute];

@NgModule({
  imports: [HmisgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    InPatientComponent,
    InPatientDetailComponent,
    InPatientUpdateComponent,
    InPatientDeleteDialogComponent,
    InPatientDeletePopupComponent
  ],
  entryComponents: [InPatientDeleteDialogComponent]
})
export class PatientServiceInPatientModule {}
