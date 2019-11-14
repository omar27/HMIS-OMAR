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
import { IInPatient, InPatient } from 'app/shared/model/patientService/in-patient.model';
import { InPatientService } from './in-patient.service';
import { IRoom } from 'app/shared/model/patientService/room.model';
import { RoomService } from 'app/entities/patientService/room/room.service';
import { IStaff } from 'app/shared/model/patientService/staff.model';
import { StaffService } from 'app/entities/patientService/staff/staff.service';
import { IPatient } from 'app/shared/model/patientService/patient.model';
import { PatientService } from 'app/entities/patientService/patient/patient.service';

@Component({
  selector: 'jhi-in-patient-update',
  templateUrl: './in-patient-update.component.html'
})
export class InPatientUpdateComponent implements OnInit {
  isSaving: boolean;

  rooms: IRoom[];

  staff: IStaff[];

  patients: IPatient[];
  admitDateDp: any;
  dischargeDateDp: any;

  editForm = this.fb.group({
    id: [],
    admitDate: [null, [Validators.required]],
    dischargeDate: [null, [Validators.required]],
    roomId: [null, Validators.required],
    suggestedById: [null, Validators.required],
    patientId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected inPatientService: InPatientService,
    protected roomService: RoomService,
    protected staffService: StaffService,
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ inPatient }) => {
      const patientId: number = parseInt(localStorage.getItem("PATIENT_ID"));
      inPatient.patientId = patientId;
      this.updateForm(inPatient);
      localStorage.removeItem("PATIENT_ID");
    });
    this.roomService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRoom[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRoom[]>) => response.body)
      )
      .subscribe((res: IRoom[]) => (this.rooms = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.staffService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStaff[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStaff[]>) => response.body)
      )
      .subscribe((res: IStaff[]) => (this.staff = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.patientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPatient[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPatient[]>) => response.body)
      )
      .subscribe((res: IPatient[]) => (this.patients = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(inPatient: IInPatient) {
    this.editForm.patchValue({
      id: inPatient.id,
      admitDate: inPatient.admitDate,
      dischargeDate: inPatient.dischargeDate,
      roomId: inPatient.roomId,
      suggestedById: inPatient.suggestedById,
      patientId: inPatient.patientId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const inPatient = this.createFromForm();
    if (inPatient.id !== undefined) {
      this.subscribeToSaveResponse(this.inPatientService.update(inPatient));
    } else {
      this.subscribeToSaveResponse(this.inPatientService.create(inPatient));
    }
  }

  private createFromForm(): IInPatient {
    return {
      ...new InPatient(),
      id: this.editForm.get(['id']).value,
      admitDate: this.editForm.get(['admitDate']).value,
      dischargeDate: this.editForm.get(['dischargeDate']).value,
      roomId: this.editForm.get(['roomId']).value,
      suggestedById: this.editForm.get(['suggestedById']).value,
      patientId: this.editForm.get(['patientId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInPatient>>) {
    result.subscribe((resp) => this.onSaveSuccess(resp), () => this.onSaveError());
  }

  protected onSaveSuccess(resp: any) {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRoomById(index: number, item: IRoom) {
    return item.id;
  }

  trackStaffById(index: number, item: IStaff) {
    return item.id;
  }

  trackPatientById(index: number, item: IPatient) {
    return item.id;
  }
}
