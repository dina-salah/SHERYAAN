import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgnizationProfileComponent } from './orgnization-profile.component';

describe('OrgnizationProfileComponent', () => {
  let component: OrgnizationProfileComponent;
  let fixture: ComponentFixture<OrgnizationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgnizationProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgnizationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
