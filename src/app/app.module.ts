import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ConatinerComponent } from './conatiner/conatiner.component';
import { Router, RouterModule } from '@angular/router';
// import { FilterComponent } from './filter/filter.component';
// import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignNavbarComponent } from './sign-navbar/sign-navbar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ConatinerComponent,
    // FilterComponent,
    // NavbarComponent,
    SearchComponent,
    SliderComponent,
    FooterComponent,
    HomeComponent,
    SignNavbarComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
