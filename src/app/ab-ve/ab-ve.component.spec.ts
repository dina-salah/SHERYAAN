import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABVeComponent } from './ab-ve.component';

describe('ABVeComponent', () => {
  let component: ABVeComponent;
  let fixture: ComponentFixture<ABVeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ABVeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
