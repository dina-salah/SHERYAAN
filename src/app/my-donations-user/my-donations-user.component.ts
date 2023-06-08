import { Component, OnInit } from '@angular/core';
import { User } from '../model/signupinfo';
import { NgForm } from '@angular/forms';
import { loginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { addRequestService } from '../services/addRequest.service';
import { reqAdd } from '../model/request';

@Component({
  selector: 'app-my-donations-user',
  templateUrl: './my-donations-user.component.html',
  styleUrls: ['./my-donations-user.component.css']
})
export class MyDonationsUserComponent implements OnInit {
  donations:any // must be added in model including date, place(hospital),action(requset status)
  info: reqAdd[];
  id!:number
  user: User[];
  userFname:string;
  userLname:string;

  constructor(private router: Router,
    private service: addRequestService,
    private route: ActivatedRoute){

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['user_id'];
    this.fetch();
    this.userFname = JSON.parse(localStorage.getItem('username'));
    this.userLname = JSON.parse(localStorage.getItem('userlname'));
    this.user = JSON.parse(localStorage.getItem('userdata'));
    localStorage.setItem('user_id', JSON.stringify(this.id));
    JSON.parse(localStorage.getItem('user_id'));
  }

  fetch(){
    this.service.mydonation(this.id).subscribe((res: any) => {
      this.info = res.data;
      console.log(this.info);
    })
  }

}
