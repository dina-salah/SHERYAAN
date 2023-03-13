import { Component } from '@angular/core';
import { addRequestService } from './services/addRequest.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[addRequestService]
})
export class AppComponent {
  title = 'SHERYAAN | شريان';
  displayBar:boolean = true;

  display(){
    if (this.displayBar == true) {
      this.displayBar = false;
    }else{
      this.displayBar=true;
    }

  }

  
}
