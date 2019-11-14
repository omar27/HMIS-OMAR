import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStaffWorkingSchedule, StaffWorkingSchedule } from 'app/shared/model/patientService/staff-working-schedule.model';
import { StaffWorkingScheduleService } from './staff-working-schedule.service';
import { IStaff } from 'app/shared/model/patientService/staff.model';
import { StaffService } from 'app/entities/patientService/staff/staff.service';
import { IWorkingSchedule } from 'app/shared/model/patientService/working-schedule.model';
import { WorkingScheduleService } from 'app/entities/patientService/working-schedule/working-schedule.service';

@Component({
  selector: 'jhi-staff-working-schedule-update',
  templateUrl: './staff-working-schedule-update.component.html'
})
export class StaffWorkingScheduleUpdateComponent implements OnInit {
  isSaving: boolean;

  staff: IStaff[];

  workingschedules: IWorkingSchedule[];

  editForm = this.fb.group({
    id: [],
    description: [],
    staffId: [null, Validators.required],
    workingScheduleId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected staffWorkingScheduleService: StaffWorkingScheduleService,
    protected staffService: StaffService,
    protected workingScheduleService: WorkingScheduleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ staffWorkingSchedule }) => {
      this.updateForm(staffWorkingSchedule);
    });
    this.staffService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStaff[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStaff[]>) => response.body)
      )
      .subscribe((res: IStaff[]) => (this.staff = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.workingScheduleService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IWorkingSchedule[]>) => mayBeOk.ok),
        map((response: HttpResponse<IWorkingSchedule[]>) => response.body)
      )
      .subscribe((res: IWorkingSchedule[]) => (this.workingschedules = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(staffWorkingSchedule: IStaffWorkingSchedule) {
    this.editForm.patchValue({
      id: staffWorkingSchedule.id,
      description: staffWorkingSchedule.description,
      staffId: staffWorkingSchedule.staffId,
      workingScheduleId: staffWorkingSchedule.workingScheduleId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const staffWorkingSchedule = this.createFromForm();
    if (staffWorkingSchedule.id !== undefined) {
      this.subscribeToSaveResponse(this.staffWorkingScheduleService.update(staffWorkingSchedule));
    } else {
      this.subscribeToSaveResponse(this.staffWorkingScheduleService.create(staffWorkingSchedule));
    }
  }

  private createFromForm(): IStaffWorkingSchedule {
    return {
      ...new StaffWorkingSchedule(),
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value,
      staffId: this.editForm.get(['staffId']).value,
      workingScheduleId: this.editForm.get(['workingScheduleId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStaffWorkingSchedule>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackStaffById(index: number, item: IStaff) {
    return item.id;
  }

  trackWorkingScheduleById(index: number, item: IWorkingSchedule) {
    return item.id;
  }
}
