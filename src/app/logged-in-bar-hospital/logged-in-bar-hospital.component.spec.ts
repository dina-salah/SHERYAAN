import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInBarHospitalComponent } from './logged-in-bar-hospital.component';

describe('LoggedInBarHospitalComponent', () => {
  let component: LoggedInBarHospitalComponent;
  let fixture: ComponentFixture<LoggedInBarHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedInBarHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInBarHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
