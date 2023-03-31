import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABPositiveComponent } from './ab-positive.component';

describe('ABPositiveComponent', () => {
  let component: ABPositiveComponent;
  let fixture: ComponentFixture<ABPositiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ABPositiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABPositiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
