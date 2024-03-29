import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ConatinerComponent } from './conatiner/conatiner.component';
import { Router, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignNavbarComponent } from './sign-navbar/sign-navbar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LearnComponent } from './learn/learn.component';
import { BloodTypesComponent } from './blood-types/blood-types.component';
import { OVeComponent } from './o-ve/o-ve.component';
import { OPositiveComponent } from './o-positive/o-positive.component';
import { LearnBloodComponent } from './learn-blood/learn-blood.component';
import { LearnBanksComponent } from './learn-banks/learn-banks.component';
import { LearnDonationComponent } from './learn-donation/learn-donation.component';
import { RequestComponent } from './request/request.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HttpClientModule } from '@angular/common/http';
import { signupService } from './services/signup.service';
import { DonateComponent } from './donate/donate.component';
import { LocationComponent } from './location/location.component';
import { DonorRewardsComponent } from './donor-rewards/donor-rewards.component';
import { DonateNowComponent } from './donate-now/donate-now.component';
import { DonateSideNavComponent } from './donate-side-nav/donate-side-nav.component';
import { ReqFormComponent } from './req-form/req-form.component';
import { BloodDrivesComponent } from './blood-drives/blood-drives.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ErrorComponent } from './error/error.component';
import { LoggedInBarComponent } from './logged-in-bar/logged-in-bar.component';
import { MyrequestUserComponent } from './myrequest-user/myrequest-user.component';
import { BloodDrivesHomeComponent } from './blood-drives-home/blood-drives-home.component';
import { HospitalProfileComponent } from './hospital-profile/hospital-profile.component';
import { OrgnizationProfileComponent } from './orgnization-profile/orgnization-profile.component';
import { APositiveComponent } from './a-positive/a-positive.component';
import { AVeComponent } from './a-ve/a-ve.component';
import { BPositiveComponent } from './b-positive/b-positive.component';
import { BVeComponent } from './b-ve/b-ve.component';
import { ABPositiveComponent } from './ab-positive/ab-positive.component';
import { ABVeComponent } from './ab-ve/ab-ve.component';
import { HospitalStockComponent } from './hospital-stock/hospital-stock.component';
import { HospitalStockFormComponent } from './hospital-stock-form/hospital-stock-form.component';
import { LoggedInBarHospitalComponent } from './logged-in-bar-hospital/logged-in-bar-hospital.component';
import { LoggedInBarOrgnizationComponent } from './logged-in-bar-orgnization/logged-in-bar-orgnization.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { HospitalProfileUpdateComponent } from './hospital-profile-update/hospital-profile-update.component';
import { OrganizationProfileUpdateComponent } from './organization-profile-update/organization-profile-update.component';
import { DonationPowerComponent } from './donation-power/donation-power.component';
import { RequestHospitalComponent } from './request-hospital/request-hospital.component';
import { ReqFormHospitalComponent } from './req-form-hospital/req-form-hospital.component';
import { MyDonationsUserComponent } from './my-donations-user/my-donations-user.component';
import { MyrequestHospitalComponent } from './myrequest-hospital/myrequest-hospital.component';
import { MyReqInMyReqHospitalComponent } from './my-req-in-my-req-hospital/my-req-in-my-req-hospital.component';
import { HospitalViewResponseComponent } from './hospital-view-response/hospital-view-response.component';
import { PatientRequestsComponent } from './patient-requests/patient-requests.component';
import { MyEventComponent } from './my-event/my-event.component';
import { AddEventComponent } from './add-event/add-event.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ConatinerComponent,
    SearchComponent,
    SliderComponent,
    FooterComponent,
    HomeComponent,
    SignNavbarComponent,
    NavBarComponent,
    ContactUsComponent,
    LearnComponent,
    BloodTypesComponent,
    OVeComponent,
    OPositiveComponent,
    LearnBloodComponent,
    LearnBanksComponent,
    LearnDonationComponent,
    DonateComponent,
    LocationComponent,
    DonorRewardsComponent,
    DonateNowComponent,
    DonateSideNavComponent,
    RequestComponent,
    AboutUsComponent,
    ReqFormComponent,
    BloodDrivesComponent,
    UserProfileComponent,
    ErrorComponent,
    LoggedInBarComponent,
    MyrequestUserComponent,
    BloodDrivesHomeComponent,
    HospitalProfileComponent,
    OrgnizationProfileComponent,
    APositiveComponent,
    AVeComponent,
    BPositiveComponent,
    BVeComponent,
    ABPositiveComponent,
    ABVeComponent,
    HospitalStockComponent,
    HospitalStockFormComponent,
    LoggedInBarHospitalComponent,
    LoggedInBarOrgnizationComponent,
    UserProfileUpdateComponent,
    HospitalProfileUpdateComponent,
    OrganizationProfileUpdateComponent,
    DonationPowerComponent,
    RequestHospitalComponent,
    ReqFormHospitalComponent,
    MyDonationsUserComponent,
    MyrequestHospitalComponent,
    MyReqInMyReqHospitalComponent,
    HospitalViewResponseComponent,
    PatientRequestsComponent,
    MyEventComponent,
    AddEventComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
