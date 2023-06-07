import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
import { deleteService } from '../services/delete.service';
import { pointsService } from '../services/points.service';


const userAPI= 'http://localhost:5000//user/';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  displays:boolean=false;
  displayd:boolean=true;
  isfetching: boolean = false; 
  user?: User[];
  id!: number;
  userE = { name: '', email: '' };
  verificationCode?: string;
  message = '';
  points_Amount:any;
  user_name: string;

  constructor(private toastr: ToastrService,
    private service: loginService,
    private updateservice: updateService, 
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private delet: deleteService,
    private point: pointsService){}

  ngOnInit(){ 

    this.id = this.route.snapshot.params['user_id'];
    this.getuser();
    this.user = JSON.parse(localStorage.getItem('userdata'));
    localStorage.setItem('user_id', JSON.stringify(this.id));
    JSON.parse(localStorage.getItem('user_id'));
    this.updateservice.find(this.id).subscribe((data:User)=>{
        
      console.log(this.user[0]); 
      this.userE.name  = this.user[0].user_Fname,
      this.userE.email = this.user[0].user_Email 
      this.id = this.user[0].user_id
       
      });

  //func to retrive points amount
  this.point.points(this.id)
  .subscribe(
    (res)=>{
        this.points_Amount = res.data[0].TotalPoints
        console.log( res.data[0].TotalPoints)
    },(error)=>{
        console.log(error)
    }
  )    
  }


  dataFromLocalStorage = JSON.parse(localStorage.getItem('userdata'));
    
    addUserForm =  new FormGroup({
      user_id: new FormControl('', Validators.required),
      user_Fname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      user_Lname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      user_national_ID: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
      user_gender: new FormControl('', Validators.required),
      user_age: new FormControl('', Validators.required),
      user_address: new FormControl('', Validators.required),
      user_phoneNo: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      user_Email: new FormControl('', Validators.required),
      user_city: new FormControl('', Validators.required),
      user_blood_type: new FormControl('', Validators.required),
      user_health_status: new FormControl('', Validators.required),
      user_password: new FormControl('', Validators.required),
    })
  
    get f(){
      return this.addUserForm.controls;
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

    getuser(){
      this.isfetching = true;
      this.service.getUser(this.id).subscribe((res) => {
          this.user = res;
          const userdata = res.data;
          if (userdata) {
            localStorage.setItem('userdata', JSON.stringify(userdata));
          }
          console.log(res);
          this.isfetching = false;
          this.user_name = res[0].user_Fname;
          localStorage.setItem('username', JSON.stringify(this.user_name));

      });
        }     

//functions for deleting account with code verification
sendEmail() {
  this.http.post<any>('http://localhost:3000/sendemail', this.userE)
    .subscribe(
      (response) => {
        if (response.success) {
          this.message = 'Email sent!';
        } else {
          this.message = 'Failed to send email.';
        }
      },
      (error) => {
        this.message = 'Failed to send email.';
        console.error(error);
      }
    );
}

verifyCode() {
  if (this.verificationCode) {
    const data = {
      user: this.userE,
      verificationCode: this.verificationCode
    };
    
    this.http.post<any>('http://localhost:3000/verify-code', data)
      .subscribe(
        (response) => {
          if (response.success) {
            
            this.message = 'Code verification successful!';

            this.delet.delete(this.id)
            .subscribe(
              (data) => {
                this.service.logout();  
                console.log('account deleted');
                },
               (error) => {
                  console.log(error)
                  console.log('could not delete account');
              });
          

            
          } else {
            this.message = 'Code verification failed. Please enter the correct code.';
          }
        },
        (error) => {
          this.message = 'Code verification failed. Please enter the correct code.';
          console.error(error);
        }
      );
  } else {
    this.message = 'Please enter the verification code.';
  }
}


      
}