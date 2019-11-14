import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStaff } from 'app/shared/model/patientService/staff.model';

type EntityResponseType = HttpResponse<IStaff>;
type EntityArrayResponseType = HttpResponse<IStaff[]>;

@Injectable({ providedIn: 'root' })
export class StaffService {
  public resourceUrl = SERVER_API_URL + 'services/patientservice/api/staff';
  public resourceSearchUrl = SERVER_API_URL + 'services/patientservice/api/_search/staff';

  constructor(protected http: HttpClient) {}

  create(staff: IStaff): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(staff);
    return this.http
      .post<IStaff>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(staff: IStaff): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(staff);
    return this.http
      .put<IStaff>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStaff>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStaff[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStaff[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(staff: IStaff): IStaff {
    const copy: IStaff = Object.assign({}, staff, {
      joiningDate: staff.joiningDate != null && staff.joiningDate.isValid() ? staff.joiningDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.joiningDate = res.body.joiningDate != null ? moment(res.body.joiningDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((staff: IStaff) => {
        staff.joiningDate = staff.joiningDate != null ? moment(staff.joiningDate) : null;
      });
    }
    return res;
  }
}
