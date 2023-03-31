import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BVeComponent } from './b-ve.component';

describe('BVeComponent', () => {
  let component: BVeComponent;
  let fixture: ComponentFixture<BVeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BVeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
