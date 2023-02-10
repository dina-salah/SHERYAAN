import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnBanksComponent } from './learn-banks.component';

describe('LearnBanksComponent', () => {
  let component: LearnBanksComponent;
  let fixture: ComponentFixture<LearnBanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnBanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
