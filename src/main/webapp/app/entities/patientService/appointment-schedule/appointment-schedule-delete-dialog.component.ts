import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';
import { AppointmentScheduleService } from './appointment-schedule.service';

@Component({
  selector: 'jhi-appointment-schedule-delete-dialog',
  templateUrl: './appointment-schedule-delete-dialog.component.html'
})
export class AppointmentScheduleDeleteDialogComponent {
  appointmentSchedule: IAppointmentSchedule;

  constructor(
    protected appointmentScheduleService: AppointmentScheduleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.appointmentScheduleService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'appointmentScheduleListModification',
        content: 'Deleted an appointmentSchedule'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-appointment-schedule-delete-popup',
  template: ''
})
export class AppointmentScheduleDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ appointmentSchedule }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AppointmentScheduleDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.appointmentSchedule = appointmentSchedule;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/appointment-schedule', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/appointment-schedule', { outlets: { popup: null } }]);
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
