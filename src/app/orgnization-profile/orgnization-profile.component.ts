import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Organization } from '../model/signupinfo';
import { signupService } from '../services/signup.service';
import {ToastrService} from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loginOrgService } from '../services/loginOrg.service';
import { updateService } from '../services/update.service';

@Component({
  selector: 'app-orgnization-profile',
  templateUrl: './orgnization-profile.component.html',
  styleUrls: ['./orgnization-profile.component.css']
})
export class OrgnizationProfileComponent implements OnInit{

  isfetching: boolean = false; 
  org?: Organization[];
  id!: number;
  isLoggedInOrg: Observable<boolean>;

  constructor(private toastr: ToastrService,
    private service: loginOrgService,
    private updateservice: updateService, 
    private router: Router,
    private route: ActivatedRoute){}

    ngOnInit(){ 
      this.id = this.route.snapshot.params['organization_id'];
      this.getorg();
      this.org = JSON.parse(localStorage.getItem('organizationdata'));
    }  
    
    addOrgForm =  new FormGroup({
      organization_name: new FormControl('', Validators.required),
      organization_phoneNo: new FormControl('', Validators.required),
      organization_Email: new FormControl('', Validators.required),
      orgaization_city: new FormControl('', Validators.required),
      organization_password: new FormControl('', Validators.required),
    })

    getorg(){
      this.isfetching = true;
      this.service.getOrganization(this.id).subscribe((res) => {
          this.org = res;
          const organizationdata = res.data;
          if (organizationdata) {
            localStorage.setItem('organizationdata', JSON.stringify(organizationdata));
          }
          console.log(res);
          this.isfetching = false;
  
      });
        }

}
