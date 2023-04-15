import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalStockComponent } from './hospital-stock.component';

describe('HospitalStockComponent', () => {
  let component: HospitalStockComponent;
  let fixture: ComponentFixture<HospitalStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
