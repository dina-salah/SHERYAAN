import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile-side-bar',
  templateUrl: './user-profile-side-bar.component.html',
  styleUrls: ['./user-profile-side-bar.component.css']
})
export class UserProfileSideBarComponent {
  profilePic = '/src/assets/user-icon.png';
  name: string=''
}
