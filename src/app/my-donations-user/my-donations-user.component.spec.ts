import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDonationsUserComponent } from './my-donations-user.component';

describe('MyDonationsUserComponent', () => {
  let component: MyDonationsUserComponent;
  let fixture: ComponentFixture<MyDonationsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDonationsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDonationsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
