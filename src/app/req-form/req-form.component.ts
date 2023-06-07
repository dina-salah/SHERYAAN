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
  request = {user_id:'',hospital_id: '', blood_type: '', request_quantity: '', request_date: '', request_case: '', request_status: ''};
  user?: User[];
  constructor(private loginService: loginService,private service: addRequestService, private toastr: ToastrService, private _router: Router, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.id = this.route.snapshot.params['user_id'];
    this. getuser();
    this.service.gethospital()
    .subscribe((res) => {
      this.hospital= res.data;
      console.log(res.data);
    })
  
    this.service.getblood()
    .subscribe((res) => {
      this.blood = res.data;
      console.log(res.data);
    })

  }

  getuser(){
    this.loginService.getUser(this.id).subscribe((res) => {
        this.user = res;
        const userdata = res.data;
        if (userdata) {
          localStorage.setItem('userdata', JSON.stringify(userdata));
        }
        console.log(res);
    });
      }  

  UserForm =  new FormGroup({
    request_status: new FormControl('', Validators.required),
    blood_type: new FormControl('', Validators.required),
    request_case: new FormControl('', Validators.required),
    request_quantity:new FormControl('', Validators.required),
    hospital_id:new FormControl('', Validators.required),
  })


  addrequest(){
    this.request.user_id = this.id;
    this.request.hospital_id = this.UserForm.value.hospital_id
    this.request.blood_type = this.UserForm.value.blood_type;
    this.request.request_quantity = this.UserForm.value.request_quantity;
    this.request.request_case = this.UserForm.value.request_case;
    this.request.request_status = this.UserForm.value.request_status;
    this.service.addrequest(this.request)
    .subscribe((res) => {
      console.log(res);
      this.toastr.success('request added!');
      this._router.navigate(['/myrequest-user/', this.id]);
    })
  }

  

}
