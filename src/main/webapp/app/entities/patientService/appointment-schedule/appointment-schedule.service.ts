import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';

type EntityResponseType = HttpResponse<IAppointmentSchedule>;
type EntityArrayResponseType = HttpResponse<IAppointmentSchedule[]>;

@Injectable({ providedIn: 'root' })
export class AppointmentScheduleService {
  public resourceUrl = SERVER_API_URL + 'services/patientservice/api/appointment-schedules';
  public resourceSearchUrl = SERVER_API_URL + 'services/patientservice/api/_search/appointment-schedules';

  constructor(protected http: HttpClient) {}

  create(appointmentSchedule: IAppointmentSchedule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appointmentSchedule);
    return this.http
      .post<IAppointmentSchedule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(appointmentSchedule: IAppointmentSchedule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appointmentSchedule);
    return this.http
      .put<IAppointmentSchedule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAppointmentSchedule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAppointmentSchedule[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAppointmentSchedule[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(appointmentSchedule: IAppointmentSchedule): IAppointmentSchedule {
    const copy: IAppointmentSchedule = Object.assign({}, appointmentSchedule, {
      scheduledDate:
        appointmentSchedule.scheduledDate != null && appointmentSchedule.scheduledDate.isValid()
          ? appointmentSchedule.scheduledDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.scheduledDate = res.body.scheduledDate != null ? moment(res.body.scheduledDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((appointmentSchedule: IAppointmentSchedule) => {
        appointmentSchedule.scheduledDate = appointmentSchedule.scheduledDate != null ? moment(appointmentSchedule.scheduledDate) : null;
      });
    }
    return res;
  }
}
