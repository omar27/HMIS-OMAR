import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHospital } from 'app/shared/model/patientService/hospital.model';

@Component({
  selector: 'jhi-hospital-detail',
  templateUrl: './hospital-detail.component.html'
})
export class HospitalDetailComponent implements OnInit {
  hospital: IHospital;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ hospital }) => {
      this.hospital = hospital;
    });
  }

  previousState() {
    window.history.back();
  }
}
