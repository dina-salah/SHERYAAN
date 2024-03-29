import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../model/signupinfo';
import {ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signupService } from '../services/signup.service';
import { loginService } from '../services/login.service';
import { updateService } from '../services/update.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css']
})
export class UserProfileUpdateComponent implements OnInit{

  id!: number;
  user!: User;
  form!: FormGroup;
  username: string;
  Lastname: string;
  city: any = [];
  constructor(
    public userService: updateService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private signupservice: signupService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['user_id'];
    this.getcities();
    this.username = JSON.parse(localStorage.getItem('username'));
    this.Lastname = JSON.parse(localStorage.getItem('userlname'));
    this.userService.find(this.id).subscribe((data:User)=>{
      this.user = data;
      console.log(this.user[0]); 

      this.form.patchValue({
        user_Fname: this.user[0].user_Fname,
        user_Lname: this.user[0].user_Lname,
        user_national_ID: this.user[0].user_national_ID,
        // user_gender: this.user[0].user_gender,
        user_age: this.user[0].user_age,
        user_address: this.user[0].user_address,
        user_phoneNo: this.user[0].user_phoneNo,
        user_Email: this.user[0].user_Email, 
        location_code: this.user[0].location_code,
        city: this.user[0].city, 
        user_blood_type: this.user[0].user_blood_type,
        user_health_status: this.user[0].user_health_status,
        user_password: this.user[0].user_password
      });
    }); 

    this.form = new FormGroup({
      user_Fname: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      user_Lname: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      user_age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(60), Validators.pattern('^[0-9]+$')]),
      user_address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      location_code: new FormControl(null, Validators.required),
      user_phoneNo: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      user_Email: new FormControl(null, Validators.required),
      user_blood_type: new FormControl(null, Validators.required),
      user_health_status: new FormControl(null, Validators.required),
      user_password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+.{7,32}$$')]),
       });
  }

  getcities(){
    this.signupservice.getcities().subscribe((res) => {
      console.log(res);
      this.city = res.data;
    })
  }

  // get f(){
  //   return this.form.controls;
  // }
  
get user_password() {
  return this.form.get('user_password');
}

get user_age() {
  return this.form.get('user_age');
}

  submit(){
    console.log(this.form.value);
    this.userService.updateuser(this.id, this.form.value)
    .subscribe({
      next: (data) => {
      console.log(data)
      this.toastr.success('account created!');
    
      },
      error: (error) => {
        console.log(error)
        this.toastr.warning('check your info!');
      }
      });
  }



}
