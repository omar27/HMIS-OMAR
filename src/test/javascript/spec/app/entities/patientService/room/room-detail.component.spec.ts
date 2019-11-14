import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HmisgatewayTestModule } from '../../../../test.module';
import { RoomDetailComponent } from 'app/entities/patientService/room/room-detail.component';
import { Room } from 'app/shared/model/patientService/room.model';

describe('Component Tests', () => {
  describe('Room Management Detail Component', () => {
    let comp: RoomDetailComponent;
    let fixture: ComponentFixture<RoomDetailComponent>;
    const route = ({ data: of({ room: new Room(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmisgatewayTestModule],
        declarations: [RoomDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RoomDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RoomDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.room).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
