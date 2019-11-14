import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JobDetails } from 'app/shared/model/patientService/job-details.model';
import { JobDetailsService } from './job-details.service';
import { JobDetailsComponent } from './job-details.component';
import { JobDetailsDetailComponent } from './job-details-detail.component';
import { JobDetailsUpdateComponent } from './job-details-update.component';
import { JobDetailsDeletePopupComponent } from './job-details-delete-dialog.component';
import { IJobDetails } from 'app/shared/model/patientService/job-details.model';

@Injectable({ providedIn: 'root' })
export class JobDetailsResolve implements Resolve<IJobDetails> {
  constructor(private service: JobDetailsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IJobDetails> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<JobDetails>) => response.ok),
        map((jobDetails: HttpResponse<JobDetails>) => jobDetails.body)
      );
    }
    return of(new JobDetails());
  }
}

export const jobDetailsRoute: Routes = [
  {
    path: '',
    component: JobDetailsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'JobDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JobDetailsDetailComponent,
    resolve: {
      jobDetails: JobDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JobDetailsUpdateComponent,
    resolve: {
      jobDetails: JobDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JobDetailsUpdateComponent,
    resolve: {
      jobDetails: JobDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobDetails'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const jobDetailsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: JobDetailsDeletePopupComponent,
    resolve: {
      jobDetails: JobDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobDetails'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
