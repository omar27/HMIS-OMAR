import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { HospitalComponent } from './hospital.component';
import { HospitalDetailComponent } from './hospital-detail.component';
import { HospitalUpdateComponent } from './hospital-update.component';
import { HospitalDeletePopupComponent, HospitalDeleteDialogComponent } from './hospital-delete-dialog.component';
import { hospitalRoute, hospitalPopupRoute } from './hospital.route';

const ENTITY_STATES = [...hospitalRoute, ...hospitalPopupRoute];

@NgModule({
  imports: [HmisgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    HospitalComponent,
    HospitalDetailComponent,
    HospitalUpdateComponent,
    HospitalDeleteDialogComponent,
    HospitalDeletePopupComponent
  ],
  entryComponents: [HospitalDeleteDialogComponent]
})
export class PatientServiceHospitalModule {}
