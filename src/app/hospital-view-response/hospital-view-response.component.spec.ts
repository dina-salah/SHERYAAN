import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalViewResponseComponent } from './hospital-view-response.component';

describe('HospitalViewResponseComponent', () => {
  let component: HospitalViewResponseComponent;
  let fixture: ComponentFixture<HospitalViewResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalViewResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalViewResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
