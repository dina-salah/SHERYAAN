import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { City, reqAdd } from '../model/request';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Blood } from '../model/hospitalstock';
import {Hospital} from '../model/signupinfo'

@Component({
  selector: 'app-request-hospital',
  templateUrl: './request-hospital.component.html',
  styleUrls: ['./request-hospital.component.css']
})
export class RequestHospitalComponent implements OnInit {
  displayCityFilter:boolean =true;
  displayBloodFilter:boolean =true;
  displayHospitalFilter:boolean =true;
  id:any;
  patients?: reqAdd[];
  blood: Blood[];
  bloodfilter: Blood[]
  hospitalfilter: Hospital[]
  city: City[];
  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
  this.id = this.route.snapshot.params['hospital_id'];
  this. fetch();

 
  
  }

  bloodform = new FormGroup({
    blood_id:new FormControl(null, Validators.required),
  });
  
  hospitalform = new FormGroup({
    hospital_name:new FormControl(null, Validators.required),
    hospital_id:new FormControl(null, Validators.required)
  });

  cityform = new FormGroup({
    location_code:new FormControl(null, Validators.required),
    city:new FormControl(null, Validators.required)
  });

  Filters = new FormGroup({
    filterC :new FormControl(null, Validators.required),
    filterB :new FormControl(null, Validators.required),
    filterH :new FormControl(null, Validators.required),
  });

  private fetch(){

    this.service.allreqhospital()
    .subscribe({
     next: (res)=>{
      this.patients = res.data;
      console.log(this.patients)
      },error:(error)=>{
        console.log(error)
      }
    })
    //fetch hospital for filter
    this.service.gethospital()
  .subscribe((res) => {
    this.hospitalfilter= res.data;
    console.log(res.data);
  })
  //fetch blood for filter
  this.service.getblood()
  .subscribe((res) => {
    this.bloodfilter= res.data;
    this.blood = res.data;
    console.log(res.data);
  })
  //fetch city for filter
  this.service.getcity()
  .subscribe((res) => {
   this.city =res.data
    console.log(res.data);
  })   
  }
//display filter
displayBloodfilter(){
  this.displayCityFilter=true;
  this.displayBloodFilter =false;
  this.displayHospitalFilter=true;
}
displayCityfilter(){
  this.displayCityFilter=false;
  this.displayBloodFilter =true;
  this.displayHospitalFilter=true;
} 

displayHositalfilter(){
  this.displayCityFilter=true;
  this.displayBloodFilter =true;
  this.displayHospitalFilter=false;
} 


//filter func  
  filteredReqByBlood(id:any){
    this.service.filterblood(id.blood_id)
    .subscribe({
      next: (res)=>{
        this.patients = res.data;
        },error:(error)=>{
          console.log(error)
        }
    })
  }

  filteredReqByHospital(){
    let id = this.hospitalform.value.hospital_id
    // console.log('hi')
    // console.log(this.hospitalform.value.hospital_id)
    this.service.filterhospital(id)
    .subscribe({
      next: (res)=>{
        this.patients = res.data;
        },error:(error)=>{
          console.log(error)
        }
    })
  }

  filteredReqByCity(){
    let id =this.cityform.value.location_code
  // console.log(c.location_code)
    this.service.filtercity(id)
    .subscribe({
      next: (res)=>{
        this.patients = res.data;
        },error:(error)=>{
          console.log(error)
        }
    })
  }

  All(){
    this.service.retriveAllReq()
    .subscribe({
     next: (res)=>{
      this.patients = res.data;
      console.log(this.patients)
      },error:(error)=>{
        console.log(error)
      }
    })
  }




}
