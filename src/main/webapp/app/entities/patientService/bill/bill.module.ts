import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { BillComponent } from './bill.component';
import { BillDetailComponent } from './bill-detail.component';
import { BillUpdateComponent } from './bill-update.component';
import { BillDeletePopupComponent, BillDeleteDialogComponent } from './bill-delete-dialog.component';
import { billRoute, billPopupRoute } from './bill.route';

const ENTITY_STATES = [...billRoute, ...billPopupRoute];

@NgModule({
  imports: [HmisgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BillComponent, BillDetailComponent, BillUpdateComponent, BillDeleteDialogComponent, BillDeletePopupComponent],
  entryComponents: [BillDeleteDialogComponent]
})
export class PatientServiceBillModule {}
