import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStaffWorkingSchedule } from 'app/shared/model/patientService/staff-working-schedule.model';
import { StaffWorkingScheduleService } from './staff-working-schedule.service';

@Component({
  selector: 'jhi-staff-working-schedule-delete-dialog',
  templateUrl: './staff-working-schedule-delete-dialog.component.html'
})
export class StaffWorkingScheduleDeleteDialogComponent {
  staffWorkingSchedule: IStaffWorkingSchedule;

  constructor(
    protected staffWorkingScheduleService: StaffWorkingScheduleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.staffWorkingScheduleService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'staffWorkingScheduleListModification',
        content: 'Deleted an staffWorkingSchedule'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-staff-working-schedule-delete-popup',
  template: ''
})
export class StaffWorkingScheduleDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ staffWorkingSchedule }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StaffWorkingScheduleDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.staffWorkingSchedule = staffWorkingSchedule;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/staff-working-schedule', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/staff-working-schedule', { outlets: { popup: null } }]);
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
