import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WorkingSchedule } from 'app/shared/model/patientService/working-schedule.model';
import { WorkingScheduleService } from './working-schedule.service';
import { WorkingScheduleComponent } from './working-schedule.component';
import { WorkingScheduleDetailComponent } from './working-schedule-detail.component';
import { WorkingScheduleUpdateComponent } from './working-schedule-update.component';
import { WorkingScheduleDeletePopupComponent } from './working-schedule-delete-dialog.component';
import { IWorkingSchedule } from 'app/shared/model/patientService/working-schedule.model';

@Injectable({ providedIn: 'root' })
export class WorkingScheduleResolve implements Resolve<IWorkingSchedule> {
  constructor(private service: WorkingScheduleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWorkingSchedule> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<WorkingSchedule>) => response.ok),
        map((workingSchedule: HttpResponse<WorkingSchedule>) => workingSchedule.body)
      );
    }
    return of(new WorkingSchedule());
  }
}

export const workingScheduleRoute: Routes = [
  {
    path: '',
    component: WorkingScheduleComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'WorkingSchedules'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WorkingScheduleDetailComponent,
    resolve: {
      workingSchedule: WorkingScheduleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkingSchedules'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WorkingScheduleUpdateComponent,
    resolve: {
      workingSchedule: WorkingScheduleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkingSchedules'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WorkingScheduleUpdateComponent,
    resolve: {
      workingSchedule: WorkingScheduleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkingSchedules'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const workingSchedulePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: WorkingScheduleDeletePopupComponent,
    resolve: {
      workingSchedule: WorkingScheduleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkingSchedules'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
