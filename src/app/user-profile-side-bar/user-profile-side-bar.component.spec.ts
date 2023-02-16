import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileSideBarComponent } from './user-profile-side-bar.component';

describe('UserProfileSideBarComponent', () => {
  let component: UserProfileSideBarComponent;
  let fixture: ComponentFixture<UserProfileSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
