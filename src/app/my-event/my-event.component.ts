import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit{

  id: any;

  constructor(private service:EventService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['organization_id']; 
    this.fetch();   
  }

  fetch(){
    this.service.myevent(this.id).subscribe((res) => {
      console.log(res);
    })
  }
}
