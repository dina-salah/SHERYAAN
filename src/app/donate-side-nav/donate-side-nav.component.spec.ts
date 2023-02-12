import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateSideNavComponent } from './donate-side-nav.component';

describe('DonateSideNavComponent', () => {
  let component: DonateSideNavComponent;
  let fixture: ComponentFixture<DonateSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateSideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
