import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDrivesComponent } from './blood-drives.component';

describe('BloodDrivesComponent', () => {
  let component: BloodDrivesComponent;
  let fixture: ComponentFixture<BloodDrivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodDrivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
