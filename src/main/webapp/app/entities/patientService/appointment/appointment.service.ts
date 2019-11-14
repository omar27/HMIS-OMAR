import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAppointment } from 'app/shared/model/patientService/appointment.model';

type EntityResponseType = HttpResponse<IAppointment>;
type EntityArrayResponseType = HttpResponse<IAppointment[]>;

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  public resourceUrl = SERVER_API_URL + 'services/patientservice/api/appointments';
  public resourceSearchUrl = SERVER_API_URL + 'services/patientservice/api/_search/appointments';

  constructor(protected http: HttpClient) {}

  create(appointment: IAppointment): Observable<EntityResponseType> {
    return this.http.post<IAppointment>(this.resourceUrl, appointment, { observe: 'response' });
  }

  update(appointment: IAppointment): Observable<EntityResponseType> {
    return this.http.put<IAppointment>(this.resourceUrl, appointment, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppointment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppointment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppointment[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
