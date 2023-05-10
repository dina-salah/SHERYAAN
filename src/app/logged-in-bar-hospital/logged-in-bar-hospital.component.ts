import { Component, Output, EventEmitter } from '@angular/core'; 
import { loginHospitalService } from '../services/loginHospital.service';

@Component({
  selector: 'app-logged-in-bar-hospital',
  templateUrl: './logged-in-bar-hospital.component.html',
  styleUrls: ['./logged-in-bar-hospital.component.css']
})
export class LoggedInBarHospitalComponent {
  constructor(public hospitalservice: loginHospitalService){}

  @Output() displaynavbar = new EventEmitter<boolean>();

  changeNavBar(display:boolean) {  
    this.displaynavbar.emit(display);
  }

  onLogout() {
    this.hospitalservice.logout();                      
  };

}
