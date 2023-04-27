import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from '../services/login.service';
import { Observable, map, catchError, throwError } from 'rxjs';


@Component({
  selector: 'app-sign-navbar',
  templateUrl: './sign-navbar.component.html',
  styleUrls: ['./sign-navbar.component.css']
})
export class SignNavbarComponent implements OnInit{

  isLoggedIn$: Observable<boolean>;     

  constructor(private service: loginService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.service.isLoggedIn;
  
  };

  logout = this.service.loggedIn.next(false);
  
  onLogout() {
    this.service.logout();                      
  };

}
