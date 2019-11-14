import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobDetails } from 'app/shared/model/patientService/job-details.model';
import { JobDetailsService } from './job-details.service';

@Component({
  selector: 'jhi-job-details-delete-dialog',
  templateUrl: './job-details-delete-dialog.component.html'
})
export class JobDetailsDeleteDialogComponent {
  jobDetails: IJobDetails;

  constructor(
    protected jobDetailsService: JobDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.jobDetailsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'jobDetailsListModification',
        content: 'Deleted an jobDetails'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-job-details-delete-popup',
  template: ''
})
export class JobDetailsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ jobDetails }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(JobDetailsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.jobDetails = jobDetails;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/job-details', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/job-details', { outlets: { popup: null } }]);
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
