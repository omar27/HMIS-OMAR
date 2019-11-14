import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Stats } from 'app/shared/model/stats.model';
import { StatsService } from './stats.service';
import { StatsComponent } from './stats.component';
import { StatsDetailComponent } from './stats-detail.component';
import { IStats } from 'app/shared/model/stats.model';

@Injectable({ providedIn: 'root' })
export class StatsResolve implements Resolve<IStats> {
  constructor(private service: StatsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStats> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Stats>) => response.ok),
        map((stats: HttpResponse<Stats>) => stats.body)
      );
    }
    return of(new Stats());
  }
}

export const statsRoute: Routes = [
  {
    path: '',
    component: StatsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Stats'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StatsDetailComponent,
    resolve: {
      stats: StatsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Stats'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const statsPopupRoute: Routes = [];
