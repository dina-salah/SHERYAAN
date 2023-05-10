import { Component, Output, EventEmitter } from '@angular/core';
import { loginService } from '../services/login.service';


@Component({
  selector: 'app-logged-in-bar-hospital',
  templateUrl: './logged-in-bar-hospital.component.html',
  styleUrls: ['./logged-in-bar-hospital.component.css']
})
export class LoggedInBarHospitalComponent {
  constructor(public service: loginService){}

  @Output() displaynavbar = new EventEmitter<boolean>();

  changeNavBar(display:boolean) {  
    this.displaynavbar.emit(display);
  }

  onLogout() {
    this.service.logout();                      
  };

}
