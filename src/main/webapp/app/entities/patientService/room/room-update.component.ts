import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRoom, Room } from 'app/shared/model/patientService/room.model';
import { RoomService } from './room.service';
import { IDepartment } from 'app/shared/model/patientService/department.model';
import { DepartmentService } from 'app/entities/patientService/department/department.service';

@Component({
  selector: 'jhi-room-update',
  templateUrl: './room-update.component.html'
})
export class RoomUpdateComponent implements OnInit {
  isSaving: boolean;

  departments: IDepartment[];

  editForm = this.fb.group({
    id: [],
    category: [null, [Validators.required]],
    rent: [null, [Validators.required, Validators.min(100)]],
    roomId: [],
    availablity: [null, [Validators.required]],
    departmentId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected roomService: RoomService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ room }) => {
      this.updateForm(room);
    });
    this.departmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe((res: IDepartment[]) => (this.departments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(room: IRoom) {
    this.editForm.patchValue({
      id: room.id,
      category: room.category,
      rent: room.rent,
      roomId: room.roomId,
      availablity: room.availablity,
      departmentId: room.departmentId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const room = this.createFromForm();
    if (room.id !== undefined) {
      this.subscribeToSaveResponse(this.roomService.update(room));
    } else {
      this.subscribeToSaveResponse(this.roomService.create(room));
    }
  }

  private createFromForm(): IRoom {
    return {
      ...new Room(),
      id: this.editForm.get(['id']).value,
      category: this.editForm.get(['category']).value,
      rent: this.editForm.get(['rent']).value,
      roomId: this.editForm.get(['roomId']).value,
      availablity: this.editForm.get(['availablity']).value,
      departmentId: this.editForm.get(['departmentId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoom>>) {
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

  trackDepartmentById(index: number, item: IDepartment) {
    return item.id;
  }
}
