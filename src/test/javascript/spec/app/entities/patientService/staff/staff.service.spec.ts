import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { StaffService } from 'app/entities/patientService/staff/staff.service';
import { IStaff, Staff } from 'app/shared/model/patientService/staff.model';
import { StaffType } from 'app/shared/model/enumerations/staff-type.model';

describe('Service Tests', () => {
  describe('Staff Service', () => {
    let injector: TestBed;
    let service: StaffService;
    let httpMock: HttpTestingController;
    let elemDefault: IStaff;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(StaffService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Staff(0, StaffType.DOCTOR, 'AAAAAAA', currentDate, 0, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            joiningDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Staff', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            joiningDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            joiningDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Staff(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Staff', () => {
        const returnedFromService = Object.assign(
          {
            staffType: 'BBBBBB',
            qualification: 'BBBBBB',
            joiningDate: currentDate.format(DATE_FORMAT),
            experience: 1,
            isRegular: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            joiningDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Staff', () => {
        const returnedFromService = Object.assign(
          {
            staffType: 'BBBBBB',
            qualification: 'BBBBBB',
            joiningDate: currentDate.format(DATE_FORMAT),
            experience: 1,
            isRegular: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            joiningDate: currentDate
          },
          returnedFromService
        );
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

      it('should delete a Staff', () => {
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
