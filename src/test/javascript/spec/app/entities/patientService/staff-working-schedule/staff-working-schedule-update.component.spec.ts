import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { StaffWorkingScheduleUpdateComponent } from 'app/entities/patientService/staff-working-schedule/staff-working-schedule-update.component';
import { StaffWorkingScheduleService } from 'app/entities/patientService/staff-working-schedule/staff-working-schedule.service';
import { StaffWorkingSchedule } from 'app/shared/model/patientService/staff-working-schedule.model';

describe('Component Tests', () => {
  describe('StaffWorkingSchedule Management Update Component', () => {
    let comp: StaffWorkingScheduleUpdateComponent;
    let fixture: ComponentFixture<StaffWorkingScheduleUpdateComponent>;
    let service: StaffWorkingScheduleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [StaffWorkingScheduleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StaffWorkingScheduleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StaffWorkingScheduleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StaffWorkingScheduleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StaffWorkingSchedule(123);
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
        const entity = new StaffWorkingSchedule();
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
