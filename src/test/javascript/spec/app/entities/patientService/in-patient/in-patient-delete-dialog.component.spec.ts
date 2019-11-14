import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HmisgatewayTestModule } from '../../../../test.module';
import { InPatientDeleteDialogComponent } from 'app/entities/patientService/in-patient/in-patient-delete-dialog.component';
import { InPatientService } from 'app/entities/patientService/in-patient/in-patient.service';

describe('Component Tests', () => {
  describe('InPatient Management Delete Component', () => {
    let comp: InPatientDeleteDialogComponent;
    let fixture: ComponentFixture<InPatientDeleteDialogComponent>;
    let service: InPatientService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [InPatientDeleteDialogComponent]
      })
        .overrideTemplate(InPatientDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InPatientDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InPatientService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
