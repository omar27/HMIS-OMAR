import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPatient, Patient } from 'app/shared/model/patientService/patient.model';
import { PatientService } from './patient.service';
import { IDepartment } from 'app/shared/model/patientService/department.model';
import { DepartmentService } from 'app/entities/patientService/department/department.service';
import { IStaff } from 'app/shared/model/patientService/staff.model';

@Component({
  selector: 'jhi-patient-update',
  templateUrl: './patient-update.component.html'
})
export class PatientUpdateComponent implements OnInit {
  isSaving: boolean;

  departments: IDepartment[];

  editForm = this.fb.group({
    id: [],
    patientId: [],
    isRegular: [],
    departmentId: [null, Validators.required]
  });

  constructor(
    private router: Router,
    protected jhiAlertService: JhiAlertService,
    protected patientService: PatientService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ patient }) => {
      this.updateForm(patient);
    });
    this.departmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe((res: IDepartment[]) => (this.departments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(patient: IPatient) {
    this.editForm.patchValue({
      id: patient.id,
      patientId: patient.patientId,
      isRegular: patient.isRegular,
      departmentId: patient.departmentId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const patient = this.createFromForm();
    if (patient.id !== undefined) {
      this.subscribeToSaveResponse(this.patientService.update(patient));
    } else {
      this.subscribeToSaveResponse(this.patientService.create(patient));
    }
  }

  private createFromForm(): IPatient {
    return {
      ...new Patient(),
      id: this.editForm.get(['id']).value,
      patientId: this.editForm.get(['patientId']).value,
      isRegular: this.editForm.get(['isRegular']).value,
      departmentId: this.editForm.get(['departmentId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStaff>>) {
    result.subscribe((res) => this.onSaveSuccess(res), () => this.onSaveError());
  }

  protected onSaveSuccess(res) {
    this.isSaving = false;
    localStorage.setItem("entityId", res.body.id);
    localStorage.setItem("entityType","STAFF");
    this.router.navigate(['/personal-info/new']);
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDepartmentById(index: number, item: IDepartment) {
    return item.id;
  }
}
