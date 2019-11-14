import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HmisgatewayTestModule } from '../../../../test.module';
import { AppointmentScheduleDeleteDialogComponent } from 'app/entities/patientService/appointment-schedule/appointment-schedule-delete-dialog.component';
import { AppointmentScheduleService } from 'app/entities/patientService/appointment-schedule/appointment-schedule.service';

describe('Component Tests', () => {
  describe('AppointmentSchedule Management Delete Component', () => {
    let comp: AppointmentScheduleDeleteDialogComponent;
    let fixture: ComponentFixture<AppointmentScheduleDeleteDialogComponent>;
    let service: AppointmentScheduleService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [AppointmentScheduleDeleteDialogComponent]
      })
        .overrideTemplate(AppointmentScheduleDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppointmentScheduleDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppointmentScheduleService);
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
