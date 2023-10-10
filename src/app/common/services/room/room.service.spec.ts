import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RoomService} from "./room.service";


describe('Auth', () => {
  let component: RoomService;
  let fixture: ComponentFixture<RoomService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
