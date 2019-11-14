import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { PersonalInfoService } from 'app/entities/patientService/personal-info/personal-info.service';
import { IPersonalInfo, PersonalInfo } from 'app/shared/model/patientService/personal-info.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { EntityType } from 'app/shared/model/enumerations/entity-type.model';

describe('Service Tests', () => {
  describe('PersonalInfo Service', () => {
    let injector: TestBed;
    let service: PersonalInfoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPersonalInfo;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PersonalInfoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PersonalInfo(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        Gender.MALE,
        0,
        'AAAAAAA',
        'AAAAAAA',
        EntityType.PATIENT,
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a PersonalInfo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new PersonalInfo(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PersonalInfo', () => {
        const returnedFromService = Object.assign(
          {
            cnic: 'BBBBBB',
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            email: 'BBBBBB',
            gender: 'BBBBBB',
            age: 1,
            address: 'BBBBBB',
            city: 'BBBBBB',
            entityType: 'BBBBBB',
            entityId: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of PersonalInfo', () => {
        const returnedFromService = Object.assign(
          {
            cnic: 'BBBBBB',
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            email: 'BBBBBB',
            gender: 'BBBBBB',
            age: 1,
            address: 'BBBBBB',
            city: 'BBBBBB',
            entityType: 'BBBBBB',
            entityId: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PersonalInfo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
