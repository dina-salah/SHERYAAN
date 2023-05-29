import { Component, Output, EventEmitter, OnInit } from '@angular/core'; 
import { loginHospitalService } from '../services/loginHospital.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logged-in-bar-hospital',
  templateUrl: './logged-in-bar-hospital.component.html',
  styleUrls: ['./logged-in-bar-hospital.component.css']
})
export class LoggedInBarHospitalComponent implements OnInit{
  constructor(public hospitalservice: loginHospitalService, private route: ActivatedRoute){}

  @Output() displaynavbar = new EventEmitter<boolean>();

  id!: any;

  ngOnInit(){
    this.id = this.route.snapshot.params['hospital_id'];
    this.id = JSON.parse(localStorage.getItem('hospital_id'));
  }

  changeNavBar(display:boolean) {  
    this.displaynavbar.emit(display);
  }

  onLogout() {
    this.hospitalservice.logout();                      
  };

}
