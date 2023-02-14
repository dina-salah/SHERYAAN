import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqFormComponent } from './req-form.component';

describe('ReqFormComponent', () => {
  let component: ReqFormComponent;
  let fixture: ComponentFixture<ReqFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
