import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../model/signupinfo';
import {ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signupService } from '../services/signup.service';
import { loginService } from '../services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  
  displays:boolean=false;
  displayd:boolean=true;
  isfetching: boolean = false;
  u: any;
  userdata = [];
  errormessage: string = null;  

  constructor(private toastr: ToastrService, private http: HttpClient, private service: loginService){}

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

    ngOnInit(){
      this.isfetching = true;
      this.service.getUser().subscribe((res) =>{
        this.isfetching = false;
        console.log(res);
        this.u=res;
        this.userdata=this.u;
      }, (err) => {
        this.errormessage = err.message;
      })
    }
}
