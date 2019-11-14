import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInPatient } from 'app/shared/model/patientService/in-patient.model';

type EntityResponseType = HttpResponse<IInPatient>;
type EntityArrayResponseType = HttpResponse<IInPatient[]>;

@Injectable({ providedIn: 'root' })
export class InPatientService {
  public resourceUrl = SERVER_API_URL + 'services/patientservice/api/in-patients';
  public resourceSearchUrl = SERVER_API_URL + 'services/patientservice/api/_search/in-patients';

  constructor(protected http: HttpClient) {}

  create(inPatient: IInPatient): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inPatient);
    return this.http
      .post<IInPatient>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(inPatient: IInPatient): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inPatient);
    return this.http
      .put<IInPatient>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInPatient>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInPatient[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInPatient[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(inPatient: IInPatient): IInPatient {
    const copy: IInPatient = Object.assign({}, inPatient, {
      admitDate: inPatient.admitDate != null && inPatient.admitDate.isValid() ? inPatient.admitDate.format(DATE_FORMAT) : null,
      dischargeDate:
        inPatient.dischargeDate != null && inPatient.dischargeDate.isValid() ? inPatient.dischargeDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.admitDate = res.body.admitDate != null ? moment(res.body.admitDate) : null;
      res.body.dischargeDate = res.body.dischargeDate != null ? moment(res.body.dischargeDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((inPatient: IInPatient) => {
        inPatient.admitDate = inPatient.admitDate != null ? moment(inPatient.admitDate) : null;
        inPatient.dischargeDate = inPatient.dischargeDate != null ? moment(inPatient.dischargeDate) : null;
      });
    }
    return res;
  }
}
