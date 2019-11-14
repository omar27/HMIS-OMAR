import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IStaff, Staff } from 'app/shared/model/patientService/staff.model';
import { StaffService } from './staff.service';
import { IDepartment } from 'app/shared/model/patientService/department.model';
import { DepartmentService } from 'app/entities/patientService/department/department.service';
import { IJobDetails } from 'app/shared/model/patientService/job-details.model';
import { JobDetailsService } from 'app/entities/patientService/job-details/job-details.service';
import { IStaffWorkingSchedule } from 'app/shared/model/patientService/staff-working-schedule.model';
import { StaffWorkingScheduleService } from 'app/entities/patientService/staff-working-schedule/staff-working-schedule.service';

@Component({
  selector: 'jhi-staff-update',
  templateUrl: './staff-update.component.html'
})
export class StaffUpdateComponent implements OnInit {
  isSaving: boolean;

  departments: IDepartment[];

  jobdetails: IJobDetails[];

  staffworkingschedules: IStaffWorkingSchedule[];
  joiningDateDp: any;

  editForm = this.fb.group({
    id: [],
    staffType: [null, [Validators.required]],
    qualification: [null, [Validators.required]],
    joiningDate: [null, [Validators.required]],
    experience: [null, [Validators.required, Validators.min(0)]],
    isRegular: [],
    departmentId: [null, Validators.required],
    jobDetailsId: [null, Validators.required],
    staffWorkingScheduleId: [null, Validators.required]
  });

  constructor(
    private router: Router,
    protected jhiAlertService: JhiAlertService,
    protected staffService: StaffService,
    protected departmentService: DepartmentService,
    protected jobDetailsService: JobDetailsService,
    protected staffWorkingScheduleService: StaffWorkingScheduleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ staff }) => {
      this.updateForm(staff);
    });
    this.departmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe((res: IDepartment[]) => (this.departments = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.jobDetailsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IJobDetails[]>) => mayBeOk.ok),
        map((response: HttpResponse<IJobDetails[]>) => response.body)
      )
      .subscribe((res: IJobDetails[]) => (this.jobdetails = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.staffWorkingScheduleService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStaffWorkingSchedule[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStaffWorkingSchedule[]>) => response.body)
      )
      .subscribe(
        (res: IStaffWorkingSchedule[]) => (this.staffworkingschedules = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(staff: IStaff) {
    this.editForm.patchValue({
      id: staff.id,
      staffType: staff.staffType,
      qualification: staff.qualification,
      joiningDate: staff.joiningDate,
      experience: staff.experience,
      isRegular: staff.isRegular,
      departmentId: staff.departmentId,
      jobDetailsId: staff.jobDetailsId,
      staffWorkingScheduleId: staff.staffWorkingScheduleId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const staff = this.createFromForm();
    if (staff.id !== undefined) {
      this.subscribeToSaveResponse(this.staffService.update(staff));
    } else {
      this.subscribeToSaveResponse(this.staffService.create(staff));
    }
  }

  private createFromForm(): IStaff {
    return {
      ...new Staff(),
      id: this.editForm.get(['id']).value,
      staffType: this.editForm.get(['staffType']).value,
      qualification: this.editForm.get(['qualification']).value,
      joiningDate: this.editForm.get(['joiningDate']).value,
      experience: this.editForm.get(['experience']).value,
      isRegular: this.editForm.get(['isRegular']).value,
      departmentId: this.editForm.get(['departmentId']).value,
      jobDetailsId: this.editForm.get(['jobDetailsId']).value,
      staffWorkingScheduleId: this.editForm.get(['staffWorkingScheduleId']).value
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

  trackJobDetailsById(index: number, item: IJobDetails) {
    return item.id;
  }

  trackStaffWorkingScheduleById(index: number, item: IStaffWorkingSchedule) {
    return item.id;
  }
}
