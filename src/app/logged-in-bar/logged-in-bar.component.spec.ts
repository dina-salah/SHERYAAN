import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInBarComponent } from './logged-in-bar.component';

describe('LoggedInBarComponent', () => {
  let component: LoggedInBarComponent;
  let fixture: ComponentFixture<LoggedInBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedInBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
