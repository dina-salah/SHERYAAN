import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHospitalComponent } from './request-hospital.component';

describe('RequestHospitalComponent', () => {
  let component: RequestHospitalComponent;
  let fixture: ComponentFixture<RequestHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
