import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { StaffDetailComponent } from 'app/entities/patientService/staff/staff-detail.component';
import { Staff } from 'app/shared/model/patientService/staff.model';

describe('Component Tests', () => {
  describe('Staff Management Detail Component', () => {
    let comp: StaffDetailComponent;
    let fixture: ComponentFixture<StaffDetailComponent>;
    const route = ({ data: of({ staff: new Staff(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [StaffDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StaffDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StaffDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.staff).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
