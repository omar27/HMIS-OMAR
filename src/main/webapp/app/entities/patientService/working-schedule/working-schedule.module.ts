import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { WorkingScheduleComponent } from './working-schedule.component';
import { WorkingScheduleDetailComponent } from './working-schedule-detail.component';
import { WorkingScheduleUpdateComponent } from './working-schedule-update.component';
import { WorkingScheduleDeletePopupComponent, WorkingScheduleDeleteDialogComponent } from './working-schedule-delete-dialog.component';
import { workingScheduleRoute, workingSchedulePopupRoute } from './working-schedule.route';

const ENTITY_STATES = [...workingScheduleRoute, ...workingSchedulePopupRoute];

@NgModule({
  imports: [HmisgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    WorkingScheduleComponent,
    WorkingScheduleDetailComponent,
    WorkingScheduleUpdateComponent,
    WorkingScheduleDeleteDialogComponent,
    WorkingScheduleDeletePopupComponent
  ],
  entryComponents: [WorkingScheduleDeleteDialogComponent]
})
export class PatientServiceWorkingScheduleModule {}
