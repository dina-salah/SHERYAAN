import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../model/signupinfo';
import {ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signupService } from '../services/signup.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  
  displays:boolean=false;
  displayd:boolean=true;
  isfetching: boolean = false;
  userdata: {user_Fname,
    user_Lname,
    user_national_ID,
    user_gender,
    user_age,
    user_address,
    user_phoneNo,
    user_Email,
    user_city,
    user_blood_type,
    user_health_status,
    user_password } [] = [];
  errormessage: string = null;  

  constructor(private toastr: ToastrService, private http: HttpClient, private service: signupService){}

  user:  {user_Fname: string,
    user_Lname: string,
    user_national_ID: string,
    user_gender: string,
    user_age: number,
    user_address: string,
    user_phoneNo: string,
    user_Email: string,
    user_city: string,
    user_blood_type: string,
    user_health_status: string,
    user_password: string}

    addUserForm =  new FormGroup({
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      ssn: new FormControl(null,  Validators.required),
      age: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      bloodType: new FormControl(null, Validators.required),
      healthstatus: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  
  
    showform(){
      this.displays = true;
      this.displayd = false;
    }
    showinfo(){
      this.displays = false;
      this.displayd = true;

      this.toastr.success('profile updated successfully!');
    }

    onDelete(id:any){
      id = this.user.user_national_ID;
      this.http.delete('')
    }

    getUser(){
      this.isfetching = true;
      this.service.getUser().subscribe((user) =>{
        this.userdata = user;
        this.isfetching = false;
      }, (err) => {
        this.errormessage = err.message;
      })
    }
}
