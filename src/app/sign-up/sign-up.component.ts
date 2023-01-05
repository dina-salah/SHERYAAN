import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userDisplay: boolean=true;
  hospitalDisplay: boolean=true;
  orgDisplay: boolean=true;

  user(){
    this.userDisplay=false;
    this.hospitalDisplay=true;
    this.orgDisplay=true;
  }
  hospital(){
    this.userDisplay=true;
    this.hospitalDisplay=false;
    this.orgDisplay=true;
  }
  organization(){
    this.userDisplay=true;
    this.hospitalDisplay=true;
    this.orgDisplay=false;
  }

  submit(){
    console.log("submited")
  }

  
  
}
