import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationPowerComponent } from './donation-power.component';

describe('DonationPowerComponent', () => {
  let component: DonationPowerComponent;
  let fixture: ComponentFixture<DonationPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationPowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
