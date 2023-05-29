import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Organization } from '../model/signupinfo';
import {ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signupService } from '../services/signup.service';
import { loginOrgService } from '../services/loginOrg.service';
import { updateService } from '../services/update.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-organization-profile-update',
  templateUrl: './organization-profile-update.component.html',
  styleUrls: ['./organization-profile-update.component.css']
})
export class OrganizationProfileUpdateComponent implements OnInit{

  id!: number;
  org!: Organization;
  form!: FormGroup;

  constructor(
    public orgService: updateService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['organization_id'];
    this.orgService.findorg(this.id).subscribe((data:Organization)=>{
      this.org = data;
      console.log(this.org[0]); 

      this.form.patchValue({
        organization_name: this.org[0].organization_name,
        orgaization_city: this.org[0].orgaization_city,
        organization_email: this.org[0].organization_email,
        organization_phoneNo: this.org[0].organization_phoneNo,
        organization_password: this.org[0].organization_password
      });
    }); 

    this.form = new FormGroup({
      organization_name: new FormControl('', Validators.required),
      orgaization_city: new FormControl('', Validators.required),
      organization_email: new FormControl('', Validators.required),
      organization_phoneNo: new FormControl('', Validators.required),
      organization_password: new FormControl('',[Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+.{7,32}$$')]),
    });
  }

  get f(){
    return this.form.controls;
  }
  get organization_password() {
    return this.form.get('organization_password');
  }

  submit(){
    console.log(this.form.value);
    this.orgService.updateorg(this.id, this.form.value)
    .subscribe({
      next:(res: any) => {
         console.log('organization updated successfully!');
         this.toastr.success('profile updated successfully!');
         
    },
  error(err) {
    console.log(err)
    this.toastr.warning('check your info!');
  }})
  }

}
