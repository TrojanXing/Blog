import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
  ) {}

  searchSubmit(username) {
    this.router.navigate(['/user', username]);
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('You are Logged out', {cssClass: 'alert-info'});
    this.router.navigate(['/home'])
  }

  ngOnInit() {
  }

}
