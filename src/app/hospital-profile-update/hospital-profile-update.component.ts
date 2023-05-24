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

  constructor(
    public hospitalService: updateService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['hospital_id'];
    this.hospitalService.findhos(this.id).subscribe((data:Hospital)=>{
      this.hospital = data;
      console.log(this.hospital[0]); 

      this.form.patchValue({
        hospital_name: this.hospital[0].hospital_name,
        hospital_address: this.hospital[0].hospital_address,
        hospital_city: this.hospital[0].hospital_city,
        hospital_Email: this.hospital[0].hospital_Email,
        hospital_phoneNo: this.hospital[0].hospital_phoneNo,
        hospital_password: this.hospital[0].hospital_password
      });
    }); 

    this.form = new FormGroup({
      hospital_name: new FormControl('', Validators.required),
      hospital_address: new FormControl('', Validators.required),
      hospital_city: new FormControl('', Validators.required),
      hospital_Email: new FormControl('', Validators.required),
      hospital_phoneNo: new FormControl('', Validators.required),
      hospital_password: new FormControl('', Validators.required),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.hospitalService.updatehospital(this.id, this.form.value).subscribe((res: any) => {
         console.log('hospital updated successfully!');
         this.toastr.success('profile updated successfully!');
         
    })
  }
}
