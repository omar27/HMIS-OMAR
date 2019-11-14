import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IAppointmentSchedule, AppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';
import { AppointmentScheduleService } from './appointment-schedule.service';
import { IPatient } from 'app/shared/model/patientService/patient.model';
import { PatientService } from 'app/entities/patientService/patient/patient.service';
import { IStaff } from 'app/shared/model/patientService/staff.model';
import { StaffService } from 'app/entities/patientService/staff/staff.service';

@Component({
  selector: 'jhi-appointment-schedule-update',
  templateUrl: './appointment-schedule-update.component.html'
})
export class AppointmentScheduleUpdateComponent implements OnInit {
  isSaving: boolean;

  patients: IPatient[];

  staff: IStaff[];
  scheduledDateDp: any;

  editForm = this.fb.group({
    id: [],
    status: [null, [Validators.required]],
    scheduledDate: [null, [Validators.required]],
    patientId: [null, Validators.required],
    staffId: [null, Validators.required],
    scheduledById: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected appointmentScheduleService: AppointmentScheduleService,
    protected patientService: PatientService,
    protected staffService: StaffService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ appointmentSchedule }) => {
      this.updateForm(appointmentSchedule);
    });
    this.patientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPatient[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPatient[]>) => response.body)
      )
      .subscribe((res: IPatient[]) => (this.patients = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.staffService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStaff[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStaff[]>) => response.body)
      )
      .subscribe((res: IStaff[]) => (this.staff = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(appointmentSchedule: IAppointmentSchedule) {
    this.editForm.patchValue({
      id: appointmentSchedule.id,
      status: appointmentSchedule.status,
      scheduledDate: appointmentSchedule.scheduledDate,
      patientId: appointmentSchedule.patientId,
      staffId: appointmentSchedule.staffId,
      scheduledById: appointmentSchedule.scheduledById
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const appointmentSchedule = this.createFromForm();
    if (appointmentSchedule.id !== undefined) {
      this.subscribeToSaveResponse(this.appointmentScheduleService.update(appointmentSchedule));
    } else {
      this.subscribeToSaveResponse(this.appointmentScheduleService.create(appointmentSchedule));
    }
  }

  private createFromForm(): IAppointmentSchedule {
    return {
      ...new AppointmentSchedule(),
      id: this.editForm.get(['id']).value,
      status: this.editForm.get(['status']).value,
      scheduledDate: this.editForm.get(['scheduledDate']).value,
      patientId: this.editForm.get(['patientId']).value,
      staffId: this.editForm.get(['staffId']).value,
      scheduledById: this.editForm.get(['scheduledById']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointmentSchedule>>) {
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

  trackPatientById(index: number, item: IPatient) {
    return item.id;
  }

  trackStaffById(index: number, item: IStaff) {
    return item.id;
  }
}
