import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqFormHospitalComponent } from './req-form-hospital.component';

describe('ReqFormHospitalComponent', () => {
  let component: ReqFormHospitalComponent;
  let fixture: ComponentFixture<ReqFormHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqFormHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqFormHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
