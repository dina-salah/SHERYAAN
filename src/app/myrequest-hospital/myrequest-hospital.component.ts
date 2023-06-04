import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { reqAdd } from '../model/request';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Blood } from '../model/hospitalstock';
import {Hospital} from '../model/signupinfo'

@Component({
  selector: 'app-myrequest-hospital',
  templateUrl: './myrequest-hospital.component.html',
  styleUrls: ['./myrequest-hospital.component.css']
})
export class MyrequestHospitalComponent implements OnInit{

  id!: any;

  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['hospital_id'];
  }

}
