import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { JobDetailsComponent } from './job-details.component';
import { JobDetailsDetailComponent } from './job-details-detail.component';
import { JobDetailsUpdateComponent } from './job-details-update.component';
import { JobDetailsDeletePopupComponent, JobDetailsDeleteDialogComponent } from './job-details-delete-dialog.component';
import { jobDetailsRoute, jobDetailsPopupRoute } from './job-details.route';

const ENTITY_STATES = [...jobDetailsRoute, ...jobDetailsPopupRoute];

@NgModule({
  imports: [HmisgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    JobDetailsComponent,
    JobDetailsDetailComponent,
    JobDetailsUpdateComponent,
    JobDetailsDeleteDialogComponent,
    JobDetailsDeletePopupComponent
  ],
  entryComponents: [JobDetailsDeleteDialogComponent]
})
export class PatientServiceJobDetailsModule {}
