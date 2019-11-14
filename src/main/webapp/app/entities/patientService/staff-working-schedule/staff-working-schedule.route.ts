import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StaffWorkingSchedule } from 'app/shared/model/patientService/staff-working-schedule.model';
import { StaffWorkingScheduleService } from './staff-working-schedule.service';
import { StaffWorkingScheduleComponent } from './staff-working-schedule.component';
import { StaffWorkingScheduleDetailComponent } from './staff-working-schedule-detail.component';
import { StaffWorkingScheduleUpdateComponent } from './staff-working-schedule-update.component';
import { StaffWorkingScheduleDeletePopupComponent } from './staff-working-schedule-delete-dialog.component';
import { IStaffWorkingSchedule } from 'app/shared/model/patientService/staff-working-schedule.model';

@Injectable({ providedIn: 'root' })
export class StaffWorkingScheduleResolve implements Resolve<IStaffWorkingSchedule> {
  constructor(private service: StaffWorkingScheduleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStaffWorkingSchedule> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<StaffWorkingSchedule>) => response.ok),
        map((staffWorkingSchedule: HttpResponse<StaffWorkingSchedule>) => staffWorkingSchedule.body)
      );
    }
    return of(new StaffWorkingSchedule());
  }
}

export const staffWorkingScheduleRoute: Routes = [
  {
    path: '',
    component: StaffWorkingScheduleComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'StaffWorkingSchedules'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StaffWorkingScheduleDetailComponent,
    resolve: {
      staffWorkingSchedule: StaffWorkingScheduleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StaffWorkingSchedules'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StaffWorkingScheduleUpdateComponent,
    resolve: {
      staffWorkingSchedule: StaffWorkingScheduleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StaffWorkingSchedules'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StaffWorkingScheduleUpdateComponent,
    resolve: {
      staffWorkingSchedule: StaffWorkingScheduleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StaffWorkingSchedules'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const staffWorkingSchedulePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StaffWorkingScheduleDeletePopupComponent,
    resolve: {
      staffWorkingSchedule: StaffWorkingScheduleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StaffWorkingSchedules'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
