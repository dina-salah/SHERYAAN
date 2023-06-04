import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReqInMyReqHospitalComponent } from './my-req-in-my-req-hospital.component';

describe('MyReqInMyReqHospitalComponent', () => {
  let component: MyReqInMyReqHospitalComponent;
  let fixture: ComponentFixture<MyReqInMyReqHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReqInMyReqHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReqInMyReqHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
