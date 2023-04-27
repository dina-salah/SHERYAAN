import { Component, OnInit } from '@angular/core';
import { addRequestService } from './services/addRequest.service';
import { loginService } from './services/login.service';
import {Router} from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[addRequestService]
})
export class AppComponent implements OnInit{
  title = 'SHERYAAN | شريان';
  // display:boolean = true;

  constructor(public service: loginService, private router: Router){}

  isLoggedIn$: Observable<boolean>; 

  ngOnInit() {
    this.isLoggedIn$ = this.service.isLoggedIn;
  };

  
  onLogout() {
    this.service.logout();                      
  };


  // displayFunc(displayBar:boolean){
  //   // if (displayBar == false) {
  //   //     displayBar = true;
  //   // }else{
  //   //     displayBar=false;
  //   // }
  //   return this.display =displayBar;
  // }

  
}
