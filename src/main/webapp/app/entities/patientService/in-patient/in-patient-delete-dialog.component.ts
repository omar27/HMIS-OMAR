import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInPatient } from 'app/shared/model/patientService/in-patient.model';
import { InPatientService } from './in-patient.service';

@Component({
  selector: 'jhi-in-patient-delete-dialog',
  templateUrl: './in-patient-delete-dialog.component.html'
})
export class InPatientDeleteDialogComponent {
  inPatient: IInPatient;

  constructor(protected inPatientService: InPatientService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.inPatientService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'inPatientListModification',
        content: 'Deleted an inPatient'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-in-patient-delete-popup',
  template: ''
})
export class InPatientDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ inPatient }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(InPatientDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.inPatient = inPatient;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/in-patient', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/in-patient', { outlets: { popup: null } }]);
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
