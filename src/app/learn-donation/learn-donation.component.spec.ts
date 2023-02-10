import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnDonationComponent } from './learn-donation.component';

describe('LearnDonationComponent', () => {
  let component: LearnDonationComponent;
  let fixture: ComponentFixture<LearnDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
