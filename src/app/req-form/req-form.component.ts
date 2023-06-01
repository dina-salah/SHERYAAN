import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
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
import { Blood } from '../model/hospitalstock';
import { Hospital } from '../model/signupinfo';
@Component({
  selector: 'app-req-form',
  templateUrl: './req-form.component.html',
  styleUrls: ['./req-form.component.css']
})
export class ReqFormComponent implements OnInit {
  blood:Blood[];
  hospital:Hospital[];
  id:any;

  constructor(private service: addRequestService, private toastr: ToastrService, private _router: Router, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.id = this.route.snapshot.params['user_id'];
    this.service.getblood()
    .subscribe((res) => {
      this.blood = res.data;
      console.log(res.data);
    })

    this.service.gethospital()
    .subscribe((res) => {
      this.hospital = res.data;
      console.log(res.data);
    })

  }

  UserForm =  new FormGroup({
    request_status: new FormControl('', Validators.required),
    user_blood_type: new FormControl('', Validators.required),
    request_case: new FormControl('', Validators.required),
    request_quantity:new FormControl('', Validators.required),
    hospital_name:new FormControl('', Validators.required),
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
