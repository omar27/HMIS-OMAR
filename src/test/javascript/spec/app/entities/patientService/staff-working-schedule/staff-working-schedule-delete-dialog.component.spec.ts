import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HmisgatewayTestModule } from '../../../../test.module';
import { StaffWorkingScheduleDeleteDialogComponent } from 'app/entities/patientService/staff-working-schedule/staff-working-schedule-delete-dialog.component';
import { StaffWorkingScheduleService } from 'app/entities/patientService/staff-working-schedule/staff-working-schedule.service';

describe('Component Tests', () => {
  describe('StaffWorkingSchedule Management Delete Component', () => {
    let comp: StaffWorkingScheduleDeleteDialogComponent;
    let fixture: ComponentFixture<StaffWorkingScheduleDeleteDialogComponent>;
    let service: StaffWorkingScheduleService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [StaffWorkingScheduleDeleteDialogComponent]
      })
        .overrideTemplate(StaffWorkingScheduleDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StaffWorkingScheduleDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StaffWorkingScheduleService);
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
