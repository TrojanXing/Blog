import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../service/auth.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  username;
  email;

  constructor(
    private authService: AuthService
  ) {
    // console.log(this);
  }

  ngOnInit() {
    // console.log(this.authService.getProfile())
    this.authService.getProfile().subscribe(profile => {
      console.log(profile);
      if (profile) {
        this.username = profile['user']['username'];
        this.email = profile['user']['email'];
      }
    }, err => {
      console.log('Cannot get profile');
    });
  }

}
