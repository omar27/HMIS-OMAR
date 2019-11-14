import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IJobDetails } from 'app/shared/model/patientService/job-details.model';

type EntityResponseType = HttpResponse<IJobDetails>;
type EntityArrayResponseType = HttpResponse<IJobDetails[]>;

@Injectable({ providedIn: 'root' })
export class JobDetailsService {
  public resourceUrl = SERVER_API_URL + 'services/patientservice/api/job-details';
  public resourceSearchUrl = SERVER_API_URL + 'services/patientservice/api/_search/job-details';

  constructor(protected http: HttpClient) {}

  create(jobDetails: IJobDetails): Observable<EntityResponseType> {
    return this.http.post<IJobDetails>(this.resourceUrl, jobDetails, { observe: 'response' });
  }

  update(jobDetails: IJobDetails): Observable<EntityResponseType> {
    return this.http.put<IJobDetails>(this.resourceUrl, jobDetails, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJobDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobDetails[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
