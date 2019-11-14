import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStaffWorkingSchedule } from 'app/shared/model/patientService/staff-working-schedule.model';

type EntityResponseType = HttpResponse<IStaffWorkingSchedule>;
type EntityArrayResponseType = HttpResponse<IStaffWorkingSchedule[]>;

@Injectable({ providedIn: 'root' })
export class StaffWorkingScheduleService {
  public resourceUrl = SERVER_API_URL + 'services/patientservice/api/staff-working-schedules';
  public resourceSearchUrl = SERVER_API_URL + 'services/patientservice/api/_search/staff-working-schedules';

  constructor(protected http: HttpClient) {}

  create(staffWorkingSchedule: IStaffWorkingSchedule): Observable<EntityResponseType> {
    return this.http.post<IStaffWorkingSchedule>(this.resourceUrl, staffWorkingSchedule, { observe: 'response' });
  }

  update(staffWorkingSchedule: IStaffWorkingSchedule): Observable<EntityResponseType> {
    return this.http.put<IStaffWorkingSchedule>(this.resourceUrl, staffWorkingSchedule, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStaffWorkingSchedule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStaffWorkingSchedule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStaffWorkingSchedule[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
