import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { BillDetailComponent } from 'app/entities/patientService/bill/bill-detail.component';
import { Bill } from 'app/shared/model/patientService/bill.model';

describe('Component Tests', () => {
  describe('Bill Management Detail Component', () => {
    let comp: BillDetailComponent;
    let fixture: ComponentFixture<BillDetailComponent>;
    const route = ({ data: of({ bill: new Bill(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [BillDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BillDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BillDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bill).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
