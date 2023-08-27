import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChannelTabContentComponent } from './group-channel-tab-content.component';

describe('GroupChannelTabContentComponent', () => {
  let component: GroupChannelTabContentComponent;
  let fixture: ComponentFixture<GroupChannelTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupChannelTabContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupChannelTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
