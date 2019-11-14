import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPersonalInfo } from 'app/shared/model/patientService/personal-info.model';

type EntityResponseType = HttpResponse<IPersonalInfo>;
type EntityArrayResponseType = HttpResponse<IPersonalInfo[]>;

@Injectable({ providedIn: 'root' })
export class PersonalInfoService {
  public resourceUrl = SERVER_API_URL + 'services/patientservice/api/personal-infos';
  public resourceSearchUrl = SERVER_API_URL + 'services/patientservice/api/_search/personal-infos';

  constructor(protected http: HttpClient) {}

  create(personalInfo: IPersonalInfo): Observable<EntityResponseType> {
    return this.http.post<IPersonalInfo>(this.resourceUrl, personalInfo, { observe: 'response' });
  }

  update(personalInfo: IPersonalInfo): Observable<EntityResponseType> {
    return this.http.put<IPersonalInfo>(this.resourceUrl, personalInfo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPersonalInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersonalInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersonalInfo[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
