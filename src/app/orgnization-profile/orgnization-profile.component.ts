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
import { deleteService } from '../services/delete.service';

@Component({
  selector: 'app-orgnization-profile',
  templateUrl: './orgnization-profile.component.html',
  styleUrls: ['./orgnization-profile.component.css']
})
export class OrgnizationProfileComponent implements OnInit{
  orgE = { name: '', email: '' };
  verificationCode?: string;
  message = '';
  isfetching: boolean = false; 
  org?: Organization[];
  id!: number;
  isLoggedInOrg: Observable<boolean>;

  constructor(private toastr: ToastrService,
    private service: loginOrgService,
    private updateservice: updateService, 
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private delet: deleteService){}

    ngOnInit(){ 
      this.id = this.route.snapshot.params['organization_id'];
      this.getorg();
      
      this.id = this.org[0].organization_id
      this.org = JSON.parse(localStorage.getItem('organizationdata'));
      // this.updateservice.find(this.id).subscribe((data:Organization)=>{
        
      //   console.log(this.org[0]); 
        
        
         
      //   });
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
          this.orgE.name  = res[0].organization_name
          this.orgE.email = res[0].organization_email
  
      });
        }

        
//functions for deleting account with code verification
sendEmail() {
  console.log(this.orgE)
  this.http.post<any>('http://localhost:8081/sendemail', this.orgE)
    .subscribe(
      (response) => {
        if (response.success) {
          this.message = 'Email sent!';
        } else {
          this.message = 'Failed to send email.';
        }
      },
      (error) => {
        this.message = 'Failed to send email.';
        console.error(error);
      }
    );
}

verifyCode() {
  if (this.verificationCode) {
    const data = {
      user: this.orgE,
      verificationCode: this.verificationCode
    };
    
    this.http.post<any>('http://localhost:8081/verify-code', data)
      .subscribe(
        (response) => {
          if (response.success) {
            
            this.message = 'Code verification successful!';

            this.delet.deleteorg(this.id)
            .subscribe(
              (data) => {
                // this.router.navigate(['/src/app/home'])
                console.log('account deleted');
                },
               (error) => {
                  console.log(error)
                  console.log('could not delete account');
              });
          

            
          } else {
            this.message = 'Code verification failed. Please enter the correct code.';
          }
        },
        (error) => {
          this.message = 'Code verification failed. Please enter the correct code.';
          console.error(error);
        }
      );
  } else {
    this.message = 'Please enter the verification code.';
  }
}


      


}
