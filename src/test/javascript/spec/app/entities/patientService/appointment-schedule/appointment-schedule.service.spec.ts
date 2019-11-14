import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { AppointmentScheduleService } from 'app/entities/patientService/appointment-schedule/appointment-schedule.service';
import { IAppointmentSchedule, AppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';
import { AppointmentScheduleStatus } from 'app/shared/model/enumerations/appointment-schedule-status.model';

describe('Service Tests', () => {
  describe('AppointmentSchedule Service', () => {
    let injector: TestBed;
    let service: AppointmentScheduleService;
    let httpMock: HttpTestingController;
    let elemDefault: IAppointmentSchedule;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(AppointmentScheduleService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new AppointmentSchedule(0, AppointmentScheduleStatus.PENDING, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            scheduledDate: currentDate.format(DATE_FORMAT)
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

      it('should create a AppointmentSchedule', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            scheduledDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            scheduledDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new AppointmentSchedule(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a AppointmentSchedule', () => {
        const returnedFromService = Object.assign(
          {
            status: 'BBBBBB',
            scheduledDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            scheduledDate: currentDate
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

      it('should return a list of AppointmentSchedule', () => {
        const returnedFromService = Object.assign(
          {
            status: 'BBBBBB',
            scheduledDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            scheduledDate: currentDate
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

      it('should delete a AppointmentSchedule', () => {
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
