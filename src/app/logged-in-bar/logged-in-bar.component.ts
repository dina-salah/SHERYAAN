import { Component, Output, EventEmitter } from '@angular/core';
import { loginService } from '../services/login.service';

@Component({
  selector: 'app-logged-in-bar',
  templateUrl: './logged-in-bar.component.html',
  styleUrls: ['./logged-in-bar.component.css']
})
export class LoggedInBarComponent {
  constructor(public service: loginService){}

  @Output() displaynavbar = new EventEmitter<boolean>();

  changeNavBar(display:boolean) {  
    this.displaynavbar.emit(display);
  }

  onLogout() {
    this.service.logout();                      
  };
}
