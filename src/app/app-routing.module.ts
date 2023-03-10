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

const routes: Routes = [
  {path: '', component:HomeComponent},
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
  {path:'myrequest-user', component:MyrequestUserComponent}
  // {path:'++',component:ErrorComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
