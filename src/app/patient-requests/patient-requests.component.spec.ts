import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRequestsComponent } from './patient-requests.component';

describe('PatientRequestsComponent', () => {
  let component: PatientRequestsComponent;
  let fixture: ComponentFixture<PatientRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
