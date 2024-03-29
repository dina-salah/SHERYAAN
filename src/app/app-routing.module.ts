import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DonateComponent } from './donate/donate.component';
import { DonateNowComponent } from './donate-now/donate-now.component';
import { DonorRewardsComponent } from './donor-rewards/donor-rewards.component';
import { HomeComponent} from './home/home.component';
import { LearnComponent } from './learn/learn.component';
import { LearnBloodComponent } from './learn-blood/learn-blood.component';
import { LearnBanksComponent } from './learn-banks/learn-banks.component';
import { LearnDonationComponent } from './learn-donation/learn-donation.component';
import { LocationComponent } from './location/location.component'; 
import { OPositiveComponent } from './o-positive/o-positive.component';
import { OVeComponent } from './o-ve/o-ve.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RequestComponent } from './request/request.component';
import { AboutUsComponent} from './about-us/about-us.component';
import { BloodDrivesComponent } from './blood-drives/blood-drives.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ErrorComponent } from './error/error.component';
import { ReqFormComponent } from './req-form/req-form.component';
import { MyrequestUserComponent } from './myrequest-user/myrequest-user.component';
import { LoggedInBarComponent } from './logged-in-bar/logged-in-bar.component';
import { APositiveComponent } from './a-positive/a-positive.component';
import { AVeComponent } from './a-ve/a-ve.component';
import { BPositiveComponent } from './b-positive/b-positive.component';
import { BVeComponent } from './b-ve/b-ve.component';
import { ABPositiveComponent } from './ab-positive/ab-positive.component';
import { ABVeComponent } from './ab-ve/ab-ve.component';
import { HospitalProfileComponent } from './hospital-profile/hospital-profile.component';
import { OrgnizationProfileComponent } from './orgnization-profile/orgnization-profile.component';
import { HospitalStockComponent } from './hospital-stock/hospital-stock.component';
import { HospitalStockFormComponent } from './hospital-stock-form/hospital-stock-form.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { Organization } from './model/signupinfo';
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

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'donation-power', component:DonationPowerComponent},
  {path: 'hospital-stock-form', component:HospitalStockFormComponent},
  {path: 'hospital-stock', component:HospitalStockComponent},
  {path: 'hospital-profile', component:HospitalProfileComponent},
  {path: 'orgnization-profile', component:OrgnizationProfileComponent},
  {path:'a-positive',component:APositiveComponent},
  {path:'a-ve',component:AVeComponent},
  {path:'b-positive', component:BPositiveComponent},
  {path:'b-ve', component:BVeComponent},
  {path:'ab-positive',component:ABPositiveComponent},
  {path:'ab-ve',component:ABVeComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component:SignUpComponent},
  {path: 'home', component:HomeComponent},
  {path: 'contact-us', component:ContactUsComponent},
  {path: 'learn', component:LearnComponent},
  {path:'o-positive', component:OPositiveComponent},
  {path: 'o-ve', component:OVeComponent},
  {path: 'learn-blood', component:LearnBloodComponent},
  {path: 'learn-banks', component:LearnBanksComponent},
  {path: 'learn-donation', component:LearnDonationComponent},
  {path:'donate', component:DonateComponent},
  {path:'donate-now',component:DonateNowComponent },
  {path:'donor-rewards',component:DonorRewardsComponent},
  {path:'location',component:LocationComponent},
  {path: 'request', component:RequestComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path:'blood-drives',component:BloodDrivesComponent},
  {path:'user-profile', component:UserProfileComponent},
  {path:'req-form', component:ReqFormComponent},
  {path:'myrequest-user', component:MyrequestUserComponent},
  {path: 'logged-in-bar', component:LoggedInBarComponent},
  {path: 'user-profile/:user_id/-update', component: UserProfileUpdateComponent},
  {path: 'hospital-profile/:hospital_id/update', component: HospitalProfileUpdateComponent},
  {path: 'organization-profile/:organization_id/update', component: OrganizationProfileUpdateComponent},
  {path: 'user', redirectTo: 'user-profile', pathMatch: 'full'},
  {path: 'user/:user_id', component: UserProfileComponent},
  {path: 'hospital/:hospital_id', component: HospitalProfileComponent},
  {path: 'organization/:organization_id', component: OrgnizationProfileComponent},
  {path: 'hospital-stock/:hospital_id', component: HospitalStockComponent},
  {path: 'hospital-stock-form/:hospital_id', component: HospitalStockFormComponent},
  {path: 'request-hospital/:hospital_id', component: RequestHospitalComponent},
  {path: 'req-form-hospital/:hospital_id', component: ReqFormHospitalComponent},
  {path: 'request/:user_id', component: RequestComponent},
  {path: 'req-form/:user_id', component: ReqFormComponent},
  {path: 'my-donations-user', component:MyDonationsUserComponent},
  {path: 'my-donations-user/:user_id', component: MyDonationsUserComponent},
  {path: 'myrequest-hospital/:hospital_id', component: MyrequestHospitalComponent},
  {path: 'myrequest-user/:user_id', component: MyrequestUserComponent},
  {path: 'my-req-in-my-req-hospital/:hospital_id', component: MyReqInMyReqHospitalComponent},
  {path: 'hospital-view-response/:hospital_id', component: HospitalViewResponseComponent},
  {path: 'patient-requests/:hospital_id', component:PatientRequestsComponent},
  {path: 'my-event/:organization_id', component:MyEventComponent},
  {path: 'add-event/:organization_id', component:AddEventComponent}
  // {path:'++',component:ErrorComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
