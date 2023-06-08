import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Blood } from '../model/hospitalstock';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hospital } from '../model/signupinfo';
import { User } from '../model/signupinfo';
import { reqAdd } from '../model/request';

@Component({
  selector: 'app-myrequest-user',
  templateUrl: './myrequest-user.component.html',
  styleUrls: ['./myrequest-user.component.css']
})
export class MyrequestUserComponent implements OnInit{
  user?: User[];
  id!: any;
  userFname:string;
  userLname:string;
  myrequest: reqAdd[];
  updatedata = {request_quantity: '', request_case: '', request_id: ''}

  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
  this.id = this.route.snapshot.params['user_id'];
  this.user = JSON.parse(localStorage.getItem('userdata'));
  this.userFname = JSON.parse(localStorage.getItem('username'));
  this.userLname = JSON.parse(localStorage.getItem('userlname'));
  this.fetch();
  }

  fetch(){
    this.service.myrequestUser(this.id).subscribe((res: any) => {
      this.myrequest = res.data;
      console.log(this.myrequest);
    })
  }

  editItem(item : any) {
    item.isEditing = !item.isEditing;
   // console.log(item);
  }
  
  updateItem(item: any) {
    // this.updatedata.request_status = item.request_status;
    this.updatedata.request_case = item.request_case;
    this.updatedata.request_quantity = item.request_quantity;
    this.updatedata.request_id = item.request_id;
    console.log(this.updatedata);
    this.service.updatehospitalreq(this.updatedata)
   .subscribe(
     res => {
       console.log(res);
       item.isEditing = false;
     },
     error => {
       console.log('Error occurred while updating item');
       console.log(error);
       // Handle the error case as per your requirement
     }
   );
  }
  
    delete(h: any){
      let id = h.request_id;
      console.log(id);
      this.service.deletehospitalreq(id).subscribe((res) => {
        console.log(res);
      })
    }

}
