import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { StaffWorkingScheduleComponent } from './staff-working-schedule.component';
import { StaffWorkingScheduleDetailComponent } from './staff-working-schedule-detail.component';
import { StaffWorkingScheduleUpdateComponent } from './staff-working-schedule-update.component';
import {
  StaffWorkingScheduleDeletePopupComponent,
  StaffWorkingScheduleDeleteDialogComponent
} from './staff-working-schedule-delete-dialog.component';
import { staffWorkingScheduleRoute, staffWorkingSchedulePopupRoute } from './staff-working-schedule.route';

const ENTITY_STATES = [...staffWorkingScheduleRoute, ...staffWorkingSchedulePopupRoute];

@NgModule({
  imports: [HmisgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StaffWorkingScheduleComponent,
    StaffWorkingScheduleDetailComponent,
    StaffWorkingScheduleUpdateComponent,
    StaffWorkingScheduleDeleteDialogComponent,
    StaffWorkingScheduleDeletePopupComponent
  ],
  entryComponents: [StaffWorkingScheduleDeleteDialogComponent]
})
export class PatientServiceStaffWorkingScheduleModule {}
