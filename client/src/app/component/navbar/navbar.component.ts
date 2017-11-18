import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogoutClick() {
    // console.log('Log out');
    this.authService.logout();
    this.router.navigate(['/home'])
  }

  ngOnInit() {
  }

}
