import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  displays:boolean=false;
  displayd:boolean=true;

  user!:  {fname: string;
    lname: string;
    ssn: string;
    gender: string;
    age: string;
    address: string;
    phone: string;
    email: string;
    city: string;
    bloodType: string;
    healthstatus: string;
    password: string;}

  
    show(){
      if(this.displays==false ||this.displayd==true){
        this.displays=true
        this.displayd=false
      }else{
        this.displays=false
        this.displayd=true
      }
    }

}
