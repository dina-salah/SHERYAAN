import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTypesComponent } from './blood-types.component';

describe('BloodTypesComponent', () => {
  let component: BloodTypesComponent;
  let fixture: ComponentFixture<BloodTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
