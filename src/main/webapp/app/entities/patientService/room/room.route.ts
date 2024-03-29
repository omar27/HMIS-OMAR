import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Room } from 'app/shared/model/patientService/room.model';
import { RoomService } from './room.service';
import { RoomComponent } from './room.component';
import { RoomDetailComponent } from './room-detail.component';
import { RoomUpdateComponent } from './room-update.component';
import { RoomDeletePopupComponent } from './room-delete-dialog.component';
import { IRoom } from 'app/shared/model/patientService/room.model';

@Injectable({ providedIn: 'root' })
export class RoomResolve implements Resolve<IRoom> {
  constructor(private service: RoomService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRoom> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Room>) => response.ok),
        map((room: HttpResponse<Room>) => room.body)
      );
    }
    return of(new Room());
  }
}

export const roomRoute: Routes = [
  {
    path: '',
    component: RoomComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      defaultSort: 'id,asc',
      pageTitle: 'Rooms'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RoomDetailComponent,
    resolve: {
      room: RoomResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'Rooms'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RoomUpdateComponent,
    resolve: {
      room: RoomResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'Rooms'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RoomUpdateComponent,
    resolve: {
      room: RoomResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'Rooms'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const roomPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RoomDeletePopupComponent,
    resolve: {
      room: RoomResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'Rooms'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
