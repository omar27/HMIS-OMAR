import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IWorkingSchedule, WorkingSchedule } from 'app/shared/model/patientService/working-schedule.model';
import { WorkingScheduleService } from './working-schedule.service';

@Component({
  selector: 'jhi-working-schedule-update',
  templateUrl: './working-schedule-update.component.html'
})
export class WorkingScheduleUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    day: [null, [Validators.required]],
    isOff: [],
    startTime: [null, [Validators.required]],
    end: [null, [Validators.required]]
  });

  constructor(
    protected workingScheduleService: WorkingScheduleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ workingSchedule }) => {
      this.updateForm(workingSchedule);
    });
  }

  updateForm(workingSchedule: IWorkingSchedule) {
    this.editForm.patchValue({
      id: workingSchedule.id,
      day: workingSchedule.day,
      isOff: workingSchedule.isOff,
      startTime: workingSchedule.startTime,
      end: workingSchedule.end
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const workingSchedule = this.createFromForm();
    if (workingSchedule.id !== undefined) {
      this.subscribeToSaveResponse(this.workingScheduleService.update(workingSchedule));
    } else {
      this.subscribeToSaveResponse(this.workingScheduleService.create(workingSchedule));
    }
  }

  private createFromForm(): IWorkingSchedule {
    return {
      ...new WorkingSchedule(),
      id: this.editForm.get(['id']).value,
      day: this.editForm.get(['day']).value,
      isOff: this.editForm.get(['isOff']).value,
      startTime: this.editForm.get(['startTime']).value,
      end: this.editForm.get(['end']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkingSchedule>>) {
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
