import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { reqAdd } from '../model/request';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Blood } from '../model/hospitalstock';
import {Hospital} from '../model/signupinfo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-req-in-my-req-hospital',
  templateUrl: './my-req-in-my-req-hospital.component.html',
  styleUrls: ['./my-req-in-my-req-hospital.component.css']
})
export class MyReqInMyReqHospitalComponent implements OnInit{
  id!: any;
  hospitalreq: any[];
  status?: any;
  hospital?: Hospital[];
  updatedata = {request_quantity: '', request_case: '', request_id: ''}

  constructor(private service: addRequestService,private toastr: ToastrService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.id = this.route.snapshot.params['hospital_id'];
    this.hospital = JSON.parse(localStorage.getItem('hospitaldata'));
    this.fetch();
  }

  fetch(){
    this.service.filterhospital(this.id).subscribe((res) => {
      this.hospitalreq = res.data.map(item => ({...item, isEditing: false}));
      console.log(this.hospitalreq);
  },
  (error) => {
    console.error(error); 
  });
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
       this.router.navigate(['/my-req-in-my-req-hospital/', this.id]);
       this.toastr.success('Request updated');
      
     },
     error => {
       console.log('Error occurred while updating item');
       console.log(error);
       this.toastr.warning('Error occurred while updating request');
       // Handle the error case as per your requirement
     }
   );
  }
  
    delete(h: any){
      let id = h.request_id;
      console.log(id);
      this.service.deletehospitalreq(id)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('Request deleted');
          window.location.reload();
        },
        error => {
          console.log(error);
          this.toastr.warning('Error occurred while deleting request');
        });
    }


  
}
