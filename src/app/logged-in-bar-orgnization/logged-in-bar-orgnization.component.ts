import { Component, Output, EventEmitter } from '@angular/core';
import { loginService } from '../services/login.service';

@Component({
  selector: 'app-logged-in-bar-orgnization',
  templateUrl: './logged-in-bar-orgnization.component.html',
  styleUrls: ['./logged-in-bar-orgnization.component.css']
})
export class LoggedInBarOrgnizationComponent {
  constructor(public service: loginService){}

  @Output() displaynavbar = new EventEmitter<boolean>();

  changeNavBar(display:boolean) {  
    this.displaynavbar.emit(display);
  }

  onLogout() {
    this.service.logout();                      
  };
}
