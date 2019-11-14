import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { RoomComponent } from './room.component';
import { RoomDetailComponent } from './room-detail.component';
import { RoomUpdateComponent } from './room-update.component';
import { RoomDeletePopupComponent, RoomDeleteDialogComponent } from './room-delete-dialog.component';
import { roomRoute, roomPopupRoute } from './room.route';

const ENTITY_STATES = [...roomRoute, ...roomPopupRoute];

@NgModule({
  imports: [HmisgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RoomComponent, RoomDetailComponent, RoomUpdateComponent, RoomDeleteDialogComponent, RoomDeletePopupComponent],
  entryComponents: [RoomDeleteDialogComponent]
})
export class PatientServiceRoomModule {}
