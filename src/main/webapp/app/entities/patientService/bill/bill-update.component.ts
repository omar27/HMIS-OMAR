import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBill, Bill } from 'app/shared/model/patientService/bill.model';
import { BillService } from './bill.service';
import { IPatient } from 'app/shared/model/patientService/patient.model';
import { PatientService } from 'app/entities/patientService/patient/patient.service';

@Component({
  selector: 'jhi-bill-update',
  templateUrl: './bill-update.component.html'
})
export class BillUpdateComponent implements OnInit {
  isSaving: boolean;

  patients: IPatient[];

  editForm = this.fb.group({
    id: [],
    doctorFee: [null, [Validators.required, Validators.min(0)]],
    medicineCharges: [null, [Validators.required, Validators.min(0)]],
    testsFee: [null, [Validators.required, Validators.min(0)]],
    roomCharges: [null, [Validators.required, Validators.min(0)]],
    otherCharges: [null, [Validators.required, Validators.min(0)]],
    totalBill: [null, [Validators.required]],
    paidStatus: [null, [Validators.required]],
    patientId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected billService: BillService,
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bill }) => {
      this.updateForm(bill);
    });
    this.patientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPatient[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPatient[]>) => response.body)
      )
      .subscribe((res: IPatient[]) => (this.patients = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(bill: IBill) {
    this.editForm.patchValue({
      id: bill.id,
      doctorFee: bill.doctorFee,
      medicineCharges: bill.medicineCharges,
      testsFee: bill.testsFee,
      roomCharges: bill.roomCharges,
      otherCharges: bill.otherCharges,
      totalBill: bill.doctorFee + bill.medicineCharges + bill.roomCharges + bill.testsFee + bill.otherCharges,
      paidStatus: bill.paidStatus,
      patientId: bill.patientId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bill = this.createFromForm();
    if (bill.id !== undefined) {
      this.subscribeToSaveResponse(this.billService.update(bill));
    } else {
      this.subscribeToSaveResponse(this.billService.create(bill));
    }
  }

  calculateTotalBill(){
    const bill = this.createFromForm();
    bill.totalBill = bill.doctorFee + bill.medicineCharges + bill.otherCharges + bill.roomCharges + bill.testsFee;
    this.updateForm(bill);
  }

  private createFromForm(): IBill {
    return {
      ...new Bill(),
      id: this.editForm.get(['id']).value,
      doctorFee: this.editForm.get(['doctorFee']).value,
      medicineCharges: this.editForm.get(['medicineCharges']).value,
      testsFee: this.editForm.get(['testsFee']).value,
      roomCharges: this.editForm.get(['roomCharges']).value,
      otherCharges: this.editForm.get(['otherCharges']).value,
      totalBill: parseInt(this.editForm.get(['doctorFee']).value) + parseInt(this.editForm.get(['medicineCharges']).value)
       + parseInt(this.editForm.get(['testsFee']).value) + parseInt(this.editForm.get(['roomCharges']).value)
       + parseInt(this.editForm.get(['otherCharges']).value),
      paidStatus: this.editForm.get(['paidStatus']).value,
      patientId: this.editForm.get(['patientId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBill>>) {
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
}
