import { Component, OnInit } from '@angular/core';
import { User } from '../model/signupinfo';
import { NgForm } from '@angular/forms';
import { loginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-donations-user',
  templateUrl: './my-donations-user.component.html',
  styleUrls: ['./my-donations-user.component.css']
})
export class MyDonationsUserComponent implements OnInit {
  donations:any // must be added in model including date, place(hospital),action(requset status)
  user?: User[];
  id!:number
 
  constructor(private router: Router,
    private service: loginService,
    private route: ActivatedRoute){

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['user_id'];
    this.getuser();
    this.user = JSON.parse(localStorage.getItem('userdata'));
    localStorage.setItem('user_id', JSON.stringify(this.id));
    JSON.parse(localStorage.getItem('user_id'));
  }

  getuser(){
    this.service.getUser(this.id).subscribe((res) => {
        this.user = res;
        const userdata = res.data;
        if (userdata) {
          localStorage.setItem('userdata', JSON.stringify(userdata));
        }
        console.log(res);
    });
      }   
}
