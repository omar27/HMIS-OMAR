import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { StaffWorkingScheduleDetailComponent } from 'app/entities/patientService/staff-working-schedule/staff-working-schedule-detail.component';
import { StaffWorkingSchedule } from 'app/shared/model/patientService/staff-working-schedule.model';

describe('Component Tests', () => {
  describe('StaffWorkingSchedule Management Detail Component', () => {
    let comp: StaffWorkingScheduleDetailComponent;
    let fixture: ComponentFixture<StaffWorkingScheduleDetailComponent>;
    const route = ({ data: of({ staffWorkingSchedule: new StaffWorkingSchedule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [StaffWorkingScheduleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StaffWorkingScheduleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StaffWorkingScheduleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.staffWorkingSchedule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
