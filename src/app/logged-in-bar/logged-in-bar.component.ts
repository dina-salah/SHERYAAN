import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logged-in-bar',
  templateUrl: './logged-in-bar.component.html',
  styleUrls: ['./logged-in-bar.component.css']
})
export class LoggedInBarComponent {
  @Output() displaynavbar = new EventEmitter<boolean>();

  changeNavBar(display:boolean) {  
    this.displaynavbar.emit(display);
  }
}
