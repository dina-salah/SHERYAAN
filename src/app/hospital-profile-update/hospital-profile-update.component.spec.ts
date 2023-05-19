import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalProfileUpdateComponent } from './hospital-profile-update.component';

describe('HospitalProfileUpdateComponent', () => {
  let component: HospitalProfileUpdateComponent;
  let fixture: ComponentFixture<HospitalProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalProfileUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
