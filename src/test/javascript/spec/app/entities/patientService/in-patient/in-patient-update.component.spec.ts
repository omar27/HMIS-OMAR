import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { InPatientUpdateComponent } from 'app/entities/patientService/in-patient/in-patient-update.component';
import { InPatientService } from 'app/entities/patientService/in-patient/in-patient.service';
import { InPatient } from 'app/shared/model/patientService/in-patient.model';

describe('Component Tests', () => {
  describe('InPatient Management Update Component', () => {
    let comp: InPatientUpdateComponent;
    let fixture: ComponentFixture<InPatientUpdateComponent>;
    let service: InPatientService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [InPatientUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(InPatientUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InPatientUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InPatientService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InPatient(123);
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
        const entity = new InPatient();
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
