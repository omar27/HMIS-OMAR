import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';
import { AppointmentScheduleService } from './appointment-schedule.service';
import { AppointmentScheduleComponent } from './appointment-schedule.component';
import { AppointmentScheduleDetailComponent } from './appointment-schedule-detail.component';
import { AppointmentScheduleUpdateComponent } from './appointment-schedule-update.component';
import { AppointmentScheduleDeletePopupComponent } from './appointment-schedule-delete-dialog.component';
import { IAppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';

@Injectable({ providedIn: 'root' })
export class AppointmentScheduleResolve implements Resolve<IAppointmentSchedule> {
  constructor(private service: AppointmentScheduleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAppointmentSchedule> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AppointmentSchedule>) => response.ok),
        map((appointmentSchedule: HttpResponse<AppointmentSchedule>) => appointmentSchedule.body)
      );
    }
    return of(new AppointmentSchedule());
  }
}

export const appointmentScheduleRoute: Routes = [
  {
    path: '',
    component: AppointmentScheduleComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      defaultSort: 'id,asc',
      pageTitle: 'AppointmentSchedules'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AppointmentScheduleDetailComponent,
    resolve: {
      appointmentSchedule: AppointmentScheduleResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'AppointmentSchedules'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AppointmentScheduleUpdateComponent,
    resolve: {
      appointmentSchedule: AppointmentScheduleResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'AppointmentSchedules'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AppointmentScheduleUpdateComponent,
    resolve: {
      appointmentSchedule: AppointmentScheduleResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'AppointmentSchedules'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const appointmentSchedulePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AppointmentScheduleDeletePopupComponent,
    resolve: {
      appointmentSchedule: AppointmentScheduleResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'AppointmentSchedules'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
