import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInBarOrgnizationComponent } from './logged-in-bar-orgnization.component';

describe('LoggedInBarOrgnizationComponent', () => {
  let component: LoggedInBarOrgnizationComponent;
  let fixture: ComponentFixture<LoggedInBarOrgnizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedInBarOrgnizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInBarOrgnizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
