import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Hospital } from '../model/signupinfo';
import {ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signupService } from '../services/signup.service';
import { loginHospitalService } from '../services/loginHospital.service';
import { updateService } from '../services/update.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hospital-profile-update',
  templateUrl: './hospital-profile-update.component.html',
  styleUrls: ['./hospital-profile-update.component.css']
})
export class HospitalProfileUpdateComponent implements OnInit{

  id!: number;
  hospital!: Hospital;
  form!: FormGroup;
  hname: any;
  city: any = [];

  constructor(
    public hospitalService: updateService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private signupservice: signupService
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['hospital_id'];
    this.hname = JSON.parse(localStorage.getItem('hospitalname'));
    this.getcities();
    this.hospitalService.findhos(this.id).subscribe((data:Hospital)=>{
      this.hospital = data;
      console.log(this.hospital[0]); 

      this.form.patchValue({
        hospital_name: this.hospital[0].hospital_name,
        hospital_address: this.hospital[0].hospital_address,
        city: this.hospital[0].city,
        location_code: this.hospital[0].location_code,
        hospital_Email: this.hospital[0].hospital_Email,
        hospital_phoneNo: this.hospital[0].hospital_phoneNo,
        hospital_password: this.hospital[0].hospital_password
      });
    }); 

    this.form = new FormGroup({
      hospital_name: new FormControl('', Validators.required),
      hospital_address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      location_code: new FormControl('', Validators.required),
      hospital_Email: new FormControl('', Validators.required),
      hospital_phoneNo: new FormControl('', Validators.required),
      hospital_password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+.{7,32}$$')]),
    });
  }

  get hospital_password() {
    return this.form.get('hospital_password');
  }

  submit(){
    console.log(this.form.value);
    this.hospitalService.updatehospital(this.id, this.form.value).subscribe({
      next:(res: any) => {
         console.log('hospital updated successfully!');
         this.toastr.success('profile updated successfully!');
         
    },error(err) {
      console.log(err)
      this.toastr.warning('check your info!');
    }})
  }

  getcities(){
    this.signupservice.getcities().subscribe((res) => {
      console.log(res);
      this.city = res.data;
    })
  }
}
