import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorRewardsComponent } from './donor-rewards.component';

describe('DonorRewardsComponent', () => {
  let component: DonorRewardsComponent;
  let fixture: ComponentFixture<DonorRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorRewardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
