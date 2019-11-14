import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAppointment, Appointment } from 'app/shared/model/patientService/appointment.model';
import { AppointmentService } from './appointment.service';
import { IAppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';
import { AppointmentScheduleService } from 'app/entities/patientService/appointment-schedule/appointment-schedule.service';
import { IBill } from 'app/shared/model/patientService/bill.model';
import { BillService } from 'app/entities/patientService/bill/bill.service';

@Component({
  selector: 'jhi-appointment-update',
  templateUrl: './appointment-update.component.html'
})
export class AppointmentUpdateComponent implements OnInit {
  isSaving: boolean;

  appointmentschedules: IAppointmentSchedule[];

  bills: IBill[];

  editForm = this.fb.group({
    id: [],
    patientStatus: [null, [Validators.required]],
    diseaseIdentified: [null, [Validators.required]],
    cureSuggested: [null, [Validators.required]],
    testsSuggested: [null, [Validators.required]],
    appointmentScheduleId: [null, Validators.required],
    billId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected appointmentService: AppointmentService,
    protected appointmentScheduleService: AppointmentScheduleService,
    protected billService: BillService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ appointment }) => {
      this.updateForm(appointment);
    });
    this.appointmentScheduleService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAppointmentSchedule[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAppointmentSchedule[]>) => response.body)
      )
      .subscribe((res: IAppointmentSchedule[]) => (this.appointmentschedules = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.billService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBill[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBill[]>) => response.body)
      )
      .subscribe((res: IBill[]) => (this.bills = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(appointment: IAppointment) {
    this.editForm.patchValue({
      id: appointment.id,
      patientStatus: appointment.patientStatus,
      diseaseIdentified: appointment.diseaseIdentified,
      cureSuggested: appointment.cureSuggested,
      testsSuggested: appointment.testsSuggested,
      appointmentScheduleId: appointment.appointmentScheduleId,
      billId: appointment.billId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const appointment = this.createFromForm();
    if (appointment.id !== undefined) {
      this.subscribeToSaveResponse(this.appointmentService.update(appointment));
    } else {
      this.subscribeToSaveResponse(this.appointmentService.create(appointment));
    }
  }

  private createFromForm(): IAppointment {
    return {
      ...new Appointment(),
      id: this.editForm.get(['id']).value,
      patientStatus: this.editForm.get(['patientStatus']).value,
      diseaseIdentified: this.editForm.get(['diseaseIdentified']).value,
      cureSuggested: this.editForm.get(['cureSuggested']).value,
      testsSuggested: this.editForm.get(['testsSuggested']).value,
      appointmentScheduleId: this.editForm.get(['appointmentScheduleId']).value,
      billId: this.editForm.get(['billId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointment>>) {
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

  trackAppointmentScheduleById(index: number, item: IAppointmentSchedule) {
    return item.id;
  }

  trackBillById(index: number, item: IBill) {
    return item.id;
  }
}
