import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../test.module';
import { StatsDetailComponent } from 'app/entities/stats/stats-detail.component';
import { Stats } from 'app/shared/model/stats.model';

describe('Component Tests', () => {
  describe('Stats Management Detail Component', () => {
    let comp: StatsDetailComponent;
    let fixture: ComponentFixture<StatsDetailComponent>;
    const route = ({ data: of({ stats: new Stats(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [StatsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StatsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.stats).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
