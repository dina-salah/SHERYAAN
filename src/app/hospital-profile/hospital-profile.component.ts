import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Hospital } from '../model/signupinfo';
import { signupService } from '../services/signup.service';
import {ToastrService} from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loginHospitalService } from '../services/loginHospital.service';
import { updateService } from '../services/update.service';
import { deleteService } from '../services/delete.service';

@Component({
  selector: 'app-hospital-profile',
  templateUrl: './hospital-profile.component.html',
  styleUrls: ['./hospital-profile.component.css']
})
export class HospitalProfileComponent implements OnInit{
  hosE = { name: '', email: '' };
  verificationCode?: string;
  displays:boolean = false;
  displayd:boolean = true;
  isfetching: boolean = false; 
  hospital?: Hospital[];
  id!: number;
  message = '';
  hospital_name: string;

  constructor(private toastr: ToastrService,
    private service: loginHospitalService,
    private updateservice: updateService, 
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private delet: deleteService){}

  ngOnInit(){ 
    this.id = this.route.snapshot.params['hospital_id'];
    this.gethospital();
    this.hospital = JSON.parse(localStorage.getItem('hospitaldata'));
    localStorage.setItem('hospital_id', JSON.stringify(this.id));
    JSON.parse(localStorage.getItem('hospital_id'));
    
  }  

  addHospitalForm =  new FormGroup({
    hospitral_name: new FormControl('', Validators.required),
    hospitral_address: new FormControl('', Validators.required),
    hospitral_phoneNo: new FormControl('', Validators.required),
    hospitral_Email: new FormControl('', Validators.required),
    hospitral_city: new FormControl('', Validators.required),
    hospitral_password: new FormControl('', Validators.required),
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

  gethospital(){
    this.isfetching = true;
    this.service.getHospital(this.id)
    .subscribe((res) => {
        this.hospital = res;
        console.log(res);
        const hospitaldata = res;
        if (hospitaldata) {
          localStorage.setItem('hospitaldata', JSON.stringify(hospitaldata));
        }
        this.isfetching = false;
        // this.hosE.email = res.data[0].hospital_Email
        // this.hosE.name = res.data[0].hospital_name
        this.hospital_name = res[0].hospital_name;
        localStorage.setItem('hospitalname', JSON.stringify(this.hospital_name));

    });
      }   
  
   

    //functions for deleting account with code verification
sendEmail() {
  
  this.http.post<any>('http://localhost:8082/sendemail', this.hosE)
    .subscribe(
      (response) => {
        if (response.success) {
          this.message = 'Email sent!';
          console.log(this.message)
        } else {
          this.message = 'Failed to send email.';
          console.log(this.message)
        }
      },
      (error) => {
        this.message = 'Failed to send email.';
        console.error(error);
        console.log(this.message)
      }
    );
}

verifyCode() {
  if (this.verificationCode) {
    const data = {
      user: this.hosE,
      verificationCode: this.verificationCode
    };
    
    this.http.post<any>('http://localhost:8082/verify-code', data)
      .subscribe(
        (response) => {
          if (response.success) {
            
            this.message = 'Code verification successful!';

            this.delet.deletehospital(this.id)
            .subscribe(
              (data) => {
                // this.router.navigate(['/src/app/home'])
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
