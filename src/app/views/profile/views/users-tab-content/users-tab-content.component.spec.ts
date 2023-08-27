import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTabContentComponent } from './users-tab-content.component';

describe('UsersTabContentComponent', () => {
  let component: UsersTabContentComponent;
  let fixture: ComponentFixture<UsersTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTabContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
