import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { AppointmentScheduleDetailComponent } from 'app/entities/patientService/appointment-schedule/appointment-schedule-detail.component';
import { AppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';

describe('Component Tests', () => {
  describe('AppointmentSchedule Management Detail Component', () => {
    let comp: AppointmentScheduleDetailComponent;
    let fixture: ComponentFixture<AppointmentScheduleDetailComponent>;
    const route = ({ data: of({ appointmentSchedule: new AppointmentSchedule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [AppointmentScheduleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AppointmentScheduleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppointmentScheduleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.appointmentSchedule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
