import { ComponentFixture, TestBed } from '@angular/core/testing';
import {UserService} from "./user.service";


describe('Auth', () => {
  let component: UserService;
  let fixture: ComponentFixture<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
