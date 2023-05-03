import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalStockFormComponent } from './hospital-stock-form.component';

describe('HospitalStockFormComponent', () => {
  let component: HospitalStockFormComponent;
  let fixture: ComponentFixture<HospitalStockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalStockFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
