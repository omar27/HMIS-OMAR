import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDepartment } from 'app/shared/model/patientService/department.model';

type EntityResponseType = HttpResponse<IDepartment>;
type EntityArrayResponseType = HttpResponse<IDepartment[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  public resourceUrl = SERVER_API_URL + 'services/patientservice/api/departments';
  public resourceSearchUrl = SERVER_API_URL + 'services/patientservice/api/_search/departments';

  constructor(protected http: HttpClient) {}

  create(department: IDepartment): Observable<EntityResponseType> {
    return this.http.post<IDepartment>(this.resourceUrl, department, { observe: 'response' });
  }

  update(department: IDepartment): Observable<EntityResponseType> {
    return this.http.put<IDepartment>(this.resourceUrl, department, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepartment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartment[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
