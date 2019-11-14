import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { AppointmentScheduleUpdateComponent } from 'app/entities/patientService/appointment-schedule/appointment-schedule-update.component';
import { AppointmentScheduleService } from 'app/entities/patientService/appointment-schedule/appointment-schedule.service';
import { AppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';

describe('Component Tests', () => {
  describe('AppointmentSchedule Management Update Component', () => {
    let comp: AppointmentScheduleUpdateComponent;
    let fixture: ComponentFixture<AppointmentScheduleUpdateComponent>;
    let service: AppointmentScheduleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [AppointmentScheduleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AppointmentScheduleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppointmentScheduleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppointmentScheduleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AppointmentSchedule(123);
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
        const entity = new AppointmentSchedule();
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
