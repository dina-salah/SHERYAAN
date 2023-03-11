import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrequestUserComponent } from './myrequest-user.component';

describe('MyrequestUserComponent', () => {
  let component: MyrequestUserComponent;
  let fixture: ComponentFixture<MyrequestUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyrequestUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyrequestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
