import { Component } from '@angular/core';
import { addRequestService } from './services/addRequest.service';
import {signupService} from './services/signup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[addRequestService]
})
export class AppComponent {
  title = 'SHERYAAN | شريان';
  // display:boolean = true;

  constructor(public _signupService:signupService){}
  // displayFunc(displayBar:boolean){
  //   // if (displayBar == false) {
  //   //     displayBar = true;
  //   // }else{
  //   //     displayBar=false;
  //   // }
  //   return this.display =displayBar;
  // }

  
}
