import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OVeComponent } from './o-ve.component';

describe('OVeComponent', () => {
  let component: OVeComponent;
  let fixture: ComponentFixture<OVeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OVeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
