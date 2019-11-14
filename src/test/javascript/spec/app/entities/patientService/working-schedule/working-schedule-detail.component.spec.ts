import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { WorkingScheduleDetailComponent } from 'app/entities/patientService/working-schedule/working-schedule-detail.component';
import { WorkingSchedule } from 'app/shared/model/patientService/working-schedule.model';

describe('Component Tests', () => {
  describe('WorkingSchedule Management Detail Component', () => {
    let comp: WorkingScheduleDetailComponent;
    let fixture: ComponentFixture<WorkingScheduleDetailComponent>;
    const route = ({ data: of({ workingSchedule: new WorkingSchedule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [WorkingScheduleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(WorkingScheduleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WorkingScheduleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.workingSchedule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
