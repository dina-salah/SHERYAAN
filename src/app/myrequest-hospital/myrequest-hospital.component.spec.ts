import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrequestHospitalComponent } from './myrequest-hospital.component';

describe('MyrequestHospitalComponent', () => {
  let component: MyrequestHospitalComponent;
  let fixture: ComponentFixture<MyrequestHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyrequestHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyrequestHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
