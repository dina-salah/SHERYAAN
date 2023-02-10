import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent} from './home/home.component';
import { LearnComponent } from './learn/learn.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OPositiveComponent } from './o-positive/o-positive.component';
import { OVeComponent } from './o-ve/o-ve.component';
import { LearnBloodComponent } from './learn-blood/learn-blood.component';
import { LearnBanksComponent } from './learn-banks/learn-banks.component';
import { LearnDonationComponent } from './learn-donation/learn-donation.component';


const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component:SignUpComponent},
  {path: 'home', component:HomeComponent},
  {path: 'contact-us', component:ContactUsComponent},
  {path: 'learn', component:LearnComponent},
  {path:'o-positive', component:OPositiveComponent},
  {path: 'o-ve', component:OVeComponent},
  {path: 'learn-blood', component:LearnBloodComponent},
  {path: 'learn-banks', component:LearnBanksComponent},
  {path: 'learn-donation', component:LearnDonationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
