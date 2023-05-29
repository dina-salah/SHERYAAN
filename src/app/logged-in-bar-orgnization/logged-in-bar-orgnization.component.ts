import { Component, Output, EventEmitter, OnInit } from '@angular/core'; 
import { loginOrgService } from '../services/loginOrg.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logged-in-bar-orgnization',
  templateUrl: './logged-in-bar-orgnization.component.html',
  styleUrls: ['./logged-in-bar-orgnization.component.css']
})
export class LoggedInBarOrgnizationComponent implements OnInit{
  constructor(public orgService: loginOrgService, private route: ActivatedRoute){}

  @Output() displaynavbar = new EventEmitter<boolean>();
  id!: any;

  ngOnInit(){
    this.id = this.route.snapshot.params['organization_id'];
    this.id = JSON.parse(localStorage.getItem('organization_id'));
  }

  changeNavBar(display:boolean) {  
    this.displaynavbar.emit(display);
  }

  onLogout() {
    this.orgService.logout(); 
                         
  };
}
