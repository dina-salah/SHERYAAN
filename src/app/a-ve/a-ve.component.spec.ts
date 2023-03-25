import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AVeComponent } from './a-ve.component';

describe('AVeComponent', () => {
  let component: AVeComponent;
  let fixture: ComponentFixture<AVeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AVeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
