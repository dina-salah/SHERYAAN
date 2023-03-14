import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDrivesHomeComponent } from './blood-drives-home.component';

describe('BloodDrivesHomeComponent', () => {
  let component: BloodDrivesHomeComponent;
  let fixture: ComponentFixture<BloodDrivesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodDrivesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodDrivesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
