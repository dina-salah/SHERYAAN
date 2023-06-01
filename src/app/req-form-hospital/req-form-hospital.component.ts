import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-req-form-hospital',
  templateUrl: './req-form-hospital.component.html',
  styleUrls: ['./req-form-hospital.component.css']
})
export class ReqFormHospitalComponent  implements OnInit  {

  id!: any;

  constructor(private nservice: addRequestService, private toastr: ToastrService, private _router: Router, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.id = this.route.snapshot.params['hospital_id'];

  }

  form = new FormGroup({
    blood_type: new FormControl(null, Validators.required),
    blood_quantity: new FormControl(null, Validators.required),
  });

  addrequest(){}

}
