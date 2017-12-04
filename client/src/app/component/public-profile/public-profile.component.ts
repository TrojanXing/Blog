import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PublicProfileComponent implements OnInit {

  currentUrl;
  message;
  messageClass;
  username;
  email;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.currentUrl = this.activatedRoute.snapshot.params;
    // console.log(this.currentUrl);
    this.activatedRoute.params.forEach((params: Params) => {
      this.authService.searchUser(params.username).subscribe(data => {
        if (!data['success']) {
          this.message = data['message'];
          this.messageClass = 'alert alert-danger';
        } else {
          this.username = data['user'][0]['username'];
          this.email = data['user'][0]['email'];
          this.messageClass = 'alert alert-success';
          this.message = 'User found';
          console.log(data);
          // console.log(this.email);
        }
        setTimeout(() => {
          this.messageClass = null;
        }, 2000);
      })
    });

  }

}
