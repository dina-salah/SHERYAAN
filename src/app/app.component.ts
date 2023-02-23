import { Component } from '@angular/core';
import { addRequestService } from './services/addRequest.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[addRequestService]
})
export class AppComponent {
  title = 'SHERYAAN';
}
