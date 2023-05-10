import { Component, Output, EventEmitter } from '@angular/core'; 
import { loginOrgService } from '../services/loginOrg.service';

@Component({
  selector: 'app-logged-in-bar-orgnization',
  templateUrl: './logged-in-bar-orgnization.component.html',
  styleUrls: ['./logged-in-bar-orgnization.component.css']
})
export class LoggedInBarOrgnizationComponent {
  constructor(public orgService: loginOrgService){}

  @Output() displaynavbar = new EventEmitter<boolean>();

  changeNavBar(display:boolean) {  
    this.displaynavbar.emit(display);
  }

  onLogout() {
    this.orgService.logout();                      
  };
}
