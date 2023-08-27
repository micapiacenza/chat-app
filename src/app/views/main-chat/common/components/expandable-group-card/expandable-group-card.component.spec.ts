import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableGroupCardComponent } from './expandable-group-card.component';

describe('ExpandableGroupCardComponent', () => {
  let component: ExpandableGroupCardComponent;
  let fixture: ComponentFixture<ExpandableGroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandableGroupCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandableGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
