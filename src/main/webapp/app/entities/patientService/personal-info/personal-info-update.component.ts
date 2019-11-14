import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPersonalInfo, PersonalInfo } from 'app/shared/model/patientService/personal-info.model';
import { PersonalInfoService } from './personal-info.service';
import { EntityType } from 'app/shared/model/enumerations/entity-type.model';

@Component({
  selector: 'jhi-personal-info-update',
  templateUrl: './personal-info-update.component.html'
})
export class PersonalInfoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    cnic: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
    firstName: [null, [Validators.required, Validators.minLength(3)]],
    lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    phoneNumber: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
    email: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    age: [null, [Validators.required, Validators.min(0)]],
    address: [null, [Validators.required, Validators.minLength(10)]],
    city: [null, [Validators.required]],
    entityType: [null, [Validators.required]],
    entityId: [null, [Validators.required]]
  });

  constructor(protected personalInfoService: PersonalInfoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ personalInfo }) => {
      const entityType = localStorage.getItem("entityType");
      const entityId = localStorage.getItem("entityId") === "" ? "-1" : localStorage.getItem("entityId");
      personalInfo.entityId = parseInt(entityId, 10);    
      entityType !== "" ? (entityType === "PATIENT" ? (personalInfo.entityType = EntityType.PATIENT) : (personalInfo.entityType = EntityType.STAFF)) : 0;
      this.updateForm(personalInfo);
      localStorage.removeItem("entityId");
      localStorage.removeItem("entityType");
    });
    }

  updateForm(personalInfo: IPersonalInfo) {
    this.editForm.patchValue({
      id: personalInfo.id,
      cnic: personalInfo.cnic,
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      phoneNumber: personalInfo.phoneNumber,
      email: personalInfo.email,
      gender: personalInfo.gender,
      age: personalInfo.age,
      address: personalInfo.address,
      city: personalInfo.city,
      entityType: personalInfo.entityType,
      entityId: personalInfo.entityId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const personalInfo = this.createFromForm();
    if (personalInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.personalInfoService.update(personalInfo));
    } else {
      this.subscribeToSaveResponse(this.personalInfoService.create(personalInfo));
    }
  }

  private createFromForm(): IPersonalInfo {
    return {
      ...new PersonalInfo(),
      id: this.editForm.get(['id']).value,
      cnic: this.editForm.get(['cnic']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      email: this.editForm.get(['email']).value,
      gender: this.editForm.get(['gender']).value,
      age: this.editForm.get(['age']).value,
      address: this.editForm.get(['address']).value,
      city: this.editForm.get(['city']).value,
      entityType: this.editForm.get(['entityType']).value,
      entityId: this.editForm.get(['entityId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonalInfo>>) {
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
