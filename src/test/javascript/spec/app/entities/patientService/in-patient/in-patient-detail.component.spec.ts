import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { InPatientDetailComponent } from 'app/entities/patientService/in-patient/in-patient-detail.component';
import { InPatient } from 'app/shared/model/patientService/in-patient.model';

describe('Component Tests', () => {
  describe('InPatient Management Detail Component', () => {
    let comp: InPatientDetailComponent;
    let fixture: ComponentFixture<InPatientDetailComponent>;
    const route = ({ data: of({ inPatient: new InPatient(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [InPatientDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(InPatientDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InPatientDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.inPatient).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
