import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInPatient } from 'app/shared/model/patientService/in-patient.model';

@Component({
  selector: 'jhi-in-patient-detail',
  templateUrl: './in-patient-detail.component.html'
})
export class InPatientDetailComponent implements OnInit {
  inPatient: IInPatient;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ inPatient }) => {
      this.inPatient = inPatient;
    });
  }

  previousState() {
    window.history.back();
  }
}
