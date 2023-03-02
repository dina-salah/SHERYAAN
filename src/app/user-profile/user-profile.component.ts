import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../model/signupinfo';
import { signupService } from '../services/signup.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  
  allusers: User[] = [];

  displays:boolean=false;
  displayd:boolean=true;

  constructor(private toastr: ToastrService){}

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

    ngOnInit(): void {

    }
    
  
    showform(){
      this.displays = true;
      this.displayd = false;
    }
    showinfo(){
      this.displays = false;
      this.displayd = true;

      this.toastr.success('profile updated successfully!');
    }

    onDelete(){

    }
}
