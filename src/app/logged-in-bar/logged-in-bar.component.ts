import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { loginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logged-in-bar',
  templateUrl: './logged-in-bar.component.html',
  styleUrls: ['./logged-in-bar.component.css']
})
export class LoggedInBarComponent implements OnInit{
  constructor(public service: loginService, private route: ActivatedRoute, private router: Router){}

  id!: any;

  ngOnInit(){
    this.id = this.route.snapshot.params['user_id'];
    this.id = JSON.parse(localStorage.getItem('user_id'));
  }

  @Output() displaynavbar = new EventEmitter<boolean>();

  changeNavBar(display:boolean) {  
    this.displaynavbar.emit(display);
  }

  onLogout() {
    this.service.logout();                      
  };

  // displayprofile(){
  //   this.router.navigate(['/user/', this.id]); 
  // }
}
