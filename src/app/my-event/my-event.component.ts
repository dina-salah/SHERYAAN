import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit{

  id: any;
  status?: any;
  events: any[];
  updatedata = {event_startDate: '', event_endDate: '', event_address: '', location_code: ''};

  constructor(private service:EventService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['organization_id']; 
    this.fetch();   
  }

  fetch(){
    this.service.myevent(this.id).subscribe((res) => {
      this.events = res.map(item => ({...item, isEditing: false}));
      console.log(res);
    })
  }

  editItem(item : any) {
    item.isEditing = !item.isEditing; 
   // console.log(item);
  }

  update(item: any){
    this.updatedata.event_address = item.event_address;
    this.updatedata.location_code = item.location_code;
    this.updatedata.event_startDate = item.event_startDate;
    this.updatedata.event_endDate = item.event_endDate;
    this.service.updateevent(this.id, this.updatedata).subscribe((res) => {
      console.log(res);
      item.isEditing = false;
      this.toastr.success('Update successeded!');
    })
  }

  
  delete(item: any){
    this.service.delete(item.event_id)
    .subscribe(
      (res) => {
        console.log(res);
        item.isEditing = false;
        this.toastr.success('Item is deleted');
      },
      error => {
        console.log(error);
        this.toastr.warning('Error occurred while deleting item');
        // Handle the error case as per your requirement
      }
    );
  }
  
}
