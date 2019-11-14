import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HmisgatewayTestModule } from '../../../../test.module';
import { WorkingScheduleDeleteDialogComponent } from 'app/entities/patientService/working-schedule/working-schedule-delete-dialog.component';
import { WorkingScheduleService } from 'app/entities/patientService/working-schedule/working-schedule.service';

describe('Component Tests', () => {
  describe('WorkingSchedule Management Delete Component', () => {
    let comp: WorkingScheduleDeleteDialogComponent;
    let fixture: ComponentFixture<WorkingScheduleDeleteDialogComponent>;
    let service: WorkingScheduleService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [WorkingScheduleDeleteDialogComponent]
      })
        .overrideTemplate(WorkingScheduleDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WorkingScheduleDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WorkingScheduleService);
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
