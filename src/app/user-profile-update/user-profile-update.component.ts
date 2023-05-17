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

  constructor(
    public userService: updateService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['user_id'];
    this.userService.find(this.id).subscribe((data: User)=>{
      this.user = data;
      console.log(this.user); 

      this.form.patchValue({
        user_Fname: this.user.user_Fname,
        user_Lname: this.user.user_Lname,
        user_national_ID: this.user.user_national_ID,
        user_gender: this.user.user_gender,
        user_age: this.user.user_age,
        user_address: this.user.user_address,
        user_phoneNo: this.user.user_phoneNo,
        user_Email: this.user.user_Email, 
        user_city: this.user.user_city,
        user_blood_type: this.user.user_blood_type,
        user_health_status: this.user.user_health_status,
        user_password: this.user.user_password
      });
    }); 

    this.form = new FormGroup({
      user_Fname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      user_Lname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      user_national_ID: new FormControl('', Validators.required),
      user_gender: new FormControl('', Validators.required),
      user_age: new FormControl('', Validators.required),
      user_address: new FormControl('', Validators.required),
      user_phoneNo: new FormControl('', Validators.required),
      user_Email: new FormControl('', Validators.required),
      user_city: new FormControl('', Validators.required),
      user_blood_type: new FormControl('', Validators.required),
      user_health_status: new FormControl('', Validators.required),
      user_password: new FormControl('', Validators.required),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.userService.updateuser(this.id, this.form.value).subscribe((res:any) => {
         console.log('User updated successfully!');
         this.toastr.success('profile updated successfully!');
         this.router.navigateByUrl('/home');
    })
  }



}
