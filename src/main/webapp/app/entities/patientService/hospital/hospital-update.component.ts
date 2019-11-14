import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IHospital, Hospital } from 'app/shared/model/patientService/hospital.model';
import { HospitalService } from './hospital.service';

@Component({
  selector: 'jhi-hospital-update',
  templateUrl: './hospital-update.component.html'
})
export class HospitalUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(4)]],
    email: [null, [Validators.required]],
    address: [null, [Validators.required, Validators.minLength(10)]],
    phoneNumber: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
    registrationNumber: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
  });

  constructor(protected hospitalService: HospitalService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ hospital }) => {
      this.updateForm(hospital);
    });
  }

  updateForm(hospital: IHospital) {
    this.editForm.patchValue({
      id: hospital.id,
      name: hospital.name,
      email: hospital.email,
      address: hospital.address,
      phoneNumber: hospital.phoneNumber,
      registrationNumber: hospital.registrationNumber
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const hospital = this.createFromForm();
    if (hospital.id !== undefined) {
      this.subscribeToSaveResponse(this.hospitalService.update(hospital));
    } else {
      this.subscribeToSaveResponse(this.hospitalService.create(hospital));
    }
  }

  private createFromForm(): IHospital {
    return {
      ...new Hospital(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      email: this.editForm.get(['email']).value,
      address: this.editForm.get(['address']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      registrationNumber: this.editForm.get(['registrationNumber']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHospital>>) {
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
