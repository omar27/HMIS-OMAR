import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InPatient } from 'app/shared/model/patientService/in-patient.model';
import { InPatientService } from './in-patient.service';
import { InPatientComponent } from './in-patient.component';
import { InPatientDetailComponent } from './in-patient-detail.component';
import { InPatientUpdateComponent } from './in-patient-update.component';
import { InPatientDeletePopupComponent } from './in-patient-delete-dialog.component';
import { IInPatient } from 'app/shared/model/patientService/in-patient.model';

@Injectable({ providedIn: 'root' })
export class InPatientResolve implements Resolve<IInPatient> {
  constructor(private service: InPatientService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInPatient> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<InPatient>) => response.ok),
        map((inPatient: HttpResponse<InPatient>) => inPatient.body)
      );
    }
    return of(new InPatient());
  }
}

export const inPatientRoute: Routes = [
  {
    path: '',
    component: InPatientComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      defaultSort: 'id,asc',
      pageTitle: 'InPatients'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InPatientDetailComponent,
    resolve: {
      inPatient: InPatientResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'InPatients'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InPatientUpdateComponent,
    resolve: {
      inPatient: InPatientResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'InPatients'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InPatientUpdateComponent,
    resolve: {
      inPatient: InPatientResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'InPatients'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const inPatientPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: InPatientDeletePopupComponent,
    resolve: {
      inPatient: InPatientResolve
    },
    data: {
      authorities: ['ROLE_RECEPTIONIST', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'InPatients'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
