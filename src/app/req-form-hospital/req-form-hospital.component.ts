import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { reqAdd } from '../model/request';
import { Blood } from '../model/hospitalstock';
import { Hospital } from '../model/signupinfo';

@Component({
  selector: 'app-req-form-hospital',
  templateUrl: './req-form-hospital.component.html',
  styleUrls: ['./req-form-hospital.component.css']
})
export class ReqFormHospitalComponent  implements OnInit  {

  id!: any;
  blood: Blood[];
  request = {hospital_id: '', blood_type: '', request_quantity: '', request_case: ''};
  hospital?: Hospital[];
  constructor(private service: addRequestService, private toastr: ToastrService, private _router: Router, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.id = this.route.snapshot.params['hospital_id'];
    this.hospital = JSON.parse(localStorage.getItem('hospitaldata'));
    this.service.getblood()
    .subscribe((res) => {
      this.blood = res.data;
      console.log(res.data);
    })
  } 

  form = new FormGroup({
    blood_id: new FormControl(null, Validators.required),
    request_quantity: new FormControl(null, Validators.required),
    request_case: new FormControl(null, Validators.required),
    // request_status: new FormControl(null, Validators.required),
  });

  addrequest(){
    this.request.hospital_id = this.id;
    this.request.blood_type = this.form.value.blood_id;
    this.request.request_quantity = this.form.value.request_quantity;
    this.request.request_case = this.form.value.request_case;
    // this.request.request_status = this.form.value.request_status;
    this.service.addrequest(this.request).subscribe((res) => {
      console.log(res);
      this.toastr.success('request added!');
      this._router.navigate(['/request-hospital/', this.id]);
    })
  }

}
