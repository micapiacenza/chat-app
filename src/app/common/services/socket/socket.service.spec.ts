import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SocketioService} from "./socketio.service";


describe('Auth', () => {
  let component: SocketioService;
  let fixture: ComponentFixture<SocketioService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocketioService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocketioService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
