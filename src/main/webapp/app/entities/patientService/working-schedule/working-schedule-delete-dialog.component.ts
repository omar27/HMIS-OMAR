import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWorkingSchedule } from 'app/shared/model/patientService/working-schedule.model';
import { WorkingScheduleService } from './working-schedule.service';

@Component({
  selector: 'jhi-working-schedule-delete-dialog',
  templateUrl: './working-schedule-delete-dialog.component.html'
})
export class WorkingScheduleDeleteDialogComponent {
  workingSchedule: IWorkingSchedule;

  constructor(
    protected workingScheduleService: WorkingScheduleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.workingScheduleService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'workingScheduleListModification',
        content: 'Deleted an workingSchedule'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-working-schedule-delete-popup',
  template: ''
})
export class WorkingScheduleDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ workingSchedule }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(WorkingScheduleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.workingSchedule = workingSchedule;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/working-schedule', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/working-schedule', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
