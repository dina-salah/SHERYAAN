import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../model/signupinfo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signupService } from '../services/signup.service';
import { loginService } from '../services/login.service';
import { updateService } from '../services/update.service';
import { deleteService } from '../services/delete.service';
import { pointsService } from '../services/points.service';

@Component({
  selector: 'app-req-form',
  templateUrl: './req-form.component.html',
  styleUrls: ['./req-form.component.css']
})
export class ReqFormComponent implements OnInit {
  
  receiver:string = '';
  pname:string= '';
  date:Date= new Date();
  bloodtype:string= '';
  quantity:number = 0 ;
  pcase:string ='';
  address:string= '';

  constructor(private newReq: addRequestService, private http : HttpClient,private toastr: ToastrService, private _router: Router){

  }

  ngOnInit(){
  

  }

  UserForm =  new FormGroup({
    user_id: new FormControl('', Validators.required),
    user_Fname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    user_Lname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    // user_gender: new FormControl('', Validators.required),
    user_address: new FormControl('', Validators.required),
    user_city: new FormControl('', Validators.required),
    user_blood_type: new FormControl('', Validators.required),
    // Case
   //quntity
   //hospital
   //date
  })


  addrequest(){
    // this.newReq.addR(this.receiver, this.pname, this.date, this.bloodtype,this.quantity, this.pcase, this.address);
    // console.log(this.newReq.patient);
  }

  onReqAdd(req:{receiver:string, name:string, date:Date, bloodtype:string, quantity:string, pcase:string, address:string }){
    // this.http.post('https://sheryaanang-default-rtdb.firebaseio.com/products.json',req)
    // .subscribe((res)=>{
    //   console.log(res)
    // });

    // this.toastr.success('Your request has been added!');

    // this._router.navigate(['/request']);
    
  }

}
