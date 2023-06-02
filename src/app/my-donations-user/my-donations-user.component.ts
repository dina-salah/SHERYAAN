import { Component } from '@angular/core';

@Component({
  selector: 'app-my-donations-user',
  templateUrl: './my-donations-user.component.html',
  styleUrls: ['./my-donations-user.component.css']
})
export class MyDonationsUserComponent {
  donations:any // must be added in model including date, place(hospital),action(requset status)
}
