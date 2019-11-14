import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { WorkingScheduleUpdateComponent } from 'app/entities/patientService/working-schedule/working-schedule-update.component';
import { WorkingScheduleService } from 'app/entities/patientService/working-schedule/working-schedule.service';
import { WorkingSchedule } from 'app/shared/model/patientService/working-schedule.model';

describe('Component Tests', () => {
  describe('WorkingSchedule Management Update Component', () => {
    let comp: WorkingScheduleUpdateComponent;
    let fixture: ComponentFixture<WorkingScheduleUpdateComponent>;
    let service: WorkingScheduleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [WorkingScheduleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(WorkingScheduleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WorkingScheduleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WorkingScheduleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WorkingSchedule(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new WorkingSchedule();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
