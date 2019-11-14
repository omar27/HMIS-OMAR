import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IJobDetails, JobDetails } from 'app/shared/model/patientService/job-details.model';
import { JobDetailsService } from './job-details.service';

@Component({
  selector: 'jhi-job-details-update',
  templateUrl: './job-details-update.component.html'
})
export class JobDetailsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    designation: [null, [Validators.required]],
    grade: [null, [Validators.required, Validators.min(1), Validators.max(7)]],
    type: [null, [Validators.required]],
    salary: [null, [Validators.required, Validators.min(0)]],
    details: [null, [Validators.required]]
  });

  constructor(protected jobDetailsService: JobDetailsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ jobDetails }) => {
      this.updateForm(jobDetails);
    });
  }

  updateForm(jobDetails: IJobDetails) {
    this.editForm.patchValue({
      id: jobDetails.id,
      designation: jobDetails.designation,
      grade: jobDetails.grade,
      type: jobDetails.type,
      salary: jobDetails.salary,
      details: jobDetails.details
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const jobDetails = this.createFromForm();
    if (jobDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.jobDetailsService.update(jobDetails));
    } else {
      this.subscribeToSaveResponse(this.jobDetailsService.create(jobDetails));
    }
  }

  private createFromForm(): IJobDetails {
    return {
      ...new JobDetails(),
      id: this.editForm.get(['id']).value,
      designation: this.editForm.get(['designation']).value,
      grade: this.editForm.get(['grade']).value,
      type: this.editForm.get(['type']).value,
      salary: this.editForm.get(['salary']).value,
      details: this.editForm.get(['details']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobDetails>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
