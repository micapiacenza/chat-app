import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRoomTabContentComponent } from './group-room-tab-content.component';

describe('GroupRoomTabContentComponent', () => {
  let component: GroupRoomTabContentComponent;
  let fixture: ComponentFixture<GroupRoomTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupRoomTabContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupRoomTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
