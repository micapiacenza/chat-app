import { ComponentFixture, TestBed } from '@angular/core/testing';
import {GroupService} from "./group.service";


describe('Auth', () => {
  let component: GroupService;
  let fixture: ComponentFixture<GroupService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
