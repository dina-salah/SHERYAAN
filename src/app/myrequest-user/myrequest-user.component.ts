import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { City,reqAdd } from '../model/request';
import { Router, ActivatedRoute } from '@angular/router';
import { Blood } from '../model/hospitalstock';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hospital } from '../model/signupinfo';
import { User } from '../model/signupinfo';

@Component({
  selector: 'app-myrequest-user',
  templateUrl: './myrequest-user.component.html',
  styleUrls: ['./myrequest-user.component.css']
})
export class MyrequestUserComponent implements OnInit{
  user?: User[];
  id!: any;

  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
  this.id = this.route.snapshot.params['user_id'];
  this.user = JSON.parse(localStorage.getItem('userdata'));
  }
}
